// Selected Work — five storybank projects.
// Single source of truth for both the card grid and the modal.
//
// Field guide:
// - id:          stable identifier for routing/keys
// - index:       editorial numbering (01, 02...)
// - year:        small marker next to "TCS" on the card
// - title:       card and modal heading
// - oneLine:     compressed earned-secret essence (insight-led, not situation-led)
// - metrics:     2-3 hard metrics shown on card surface; ordered by impact
// - tags:        searchable technical keywords (ATS / recruiter search payload)
// - earnedSecret: pull-quote opener inside the modal
// - star:        full Situation / Action / Result drawn from the storybank
// - links:       optional external links (GitHub repo, blog post, RFC etc.)

export const projects = [
  {
    id: 'aes-gcm-migration',
    index: '01',
    year: '2024',
    org: 'TCS',
    title: 'AES-256-GCM Migration',
    oneLine:
      'Modernizing the cryptographic trust foundation of India\u2019s interbank network.',
    metrics: [
      '238 banks \u00b7 zero downtime',
      'Triple-DES \u2192 AES-256-GCM',
      'Phased HUB-routed rollout',
    ],
    tags: ['Cryptography', 'Migration Engineering', 'Bouncy Castle', 'PKI'],
    earnedSecret:
      'In legacy financial systems, the most dangerous code isn\u2019t buggy code \u2014 it\u2019s code that\u2019s still running for responsibilities that no longer exist. When I reverse-engineered SFMS, I found CA operations logic still partially active for functions IDRBT had taken over in 2014. The operational handoff was never documented, never reflected in the codebase \u2014 just silently embedded for a decade. That kind of undocumented operational debt is what makes legacy modernization genuinely hard: not the algorithm upgrade, but mapping what the system thinks it still does versus what it actually stopped doing years ago.',
    star: {
      situation:
        'SFMS (Structured Financial Messaging Service) is the cryptographic backbone used by the Reserve Bank of India and 238 banks across India for secure interbank communication. The system\u2019s encryption was built on Triple-DES \u2014 a legacy algorithm flagged for cryptographic weakness and compliance risk. The codebase was undocumented, heavily patched, and built on a version of Bouncy Castle that didn\u2019t support AES-GCM. I was the only engineer with ownership of the cryptographic modules.',
      task:
        'Design and deliver a migration from Triple-DES to AES-256-GCM across the entire SFMS network without disrupting active banking operations. A failed migration could disrupt interbank settlements, trigger regulatory escalation, and cascade payment failures across all 238 nodes simultaneously.',
      action:
        'I started by reverse-engineering the undocumented legacy codebase \u2014 tracing hidden dependencies, mapping the trust chain, identifying critical components. During this process I made a discovery not in any handover document: portions of old CA operations logic were still present and partially active in the codebase, even though our organization had handed off CA responsibilities to IDRBT around 2014. The operational transition had never been reflected in the code \u2014 signing and certificate-processing flows still contained logic that assumed CA responsibilities which no longer existed in the real architecture. I identified and removed the obsolete CA-related code, which simplified the signing and certificate-processing logic, reduced dependency complexity, and lowered migration risk. With the codebase properly mapped, I designed the migration strategy. Instead of a big-bang migration, I built a backward-compatible phased approach: migrated the central HUB first (since every transaction routes through it), built a dynamic routing mechanism so the HUB could check whether each destination node supported AES-256-GCM or still ran legacy Triple-DES and route accordingly, and directed the HUB team to implement node-compatibility tracking with caching under my technical guidance. I designed all edge cases, guided the testing team on cryptographic test scenarios, and handled all stakeholder and bank partner communication \u2014 translating cryptographic failure modes into language non-technical partners could act on.',
      result:
        'All 238 banks successfully migrated to AES-256-GCM with zero transaction outages. The phased approach reduced deployment complexity by 50% compared to a simultaneous migration. Legacy and modern nodes coexisted safely throughout. Recognized with the TCS Beyond Excellence Award.',
    },
  },

  {
    id: 'sfms-signer-jdk17',
    index: '02',
    year: '2024',
    org: 'TCS',
    title: 'SFMS Signer \u2014 JDK 17 + PKCS#11',
    oneLine:
      'Custom PKCS#11 integration layer when SunPKCS11 hit its architectural ceiling.',
    metrics: [
      '200ms \u2192 100\u2013120ms signing latency',
      '230+ banks impacted',
      '3\u20134 month research \u2192 production cycle',
    ],
    tags: ['Java 17', 'PKCS#11', 'HSM', 'Spring Boot', 'Performance'],
    earnedSecret:
      'SunPKCS11 will get you to working crypto \u2014 but the moment you need to manage tokens rather than just use them, you\u2019ve hit its permanent ceiling. Cryptographic operations and token orchestration are fundamentally different use cases, and that distinction is invisible until it blocks you. The forced migration became the opportunity.',
    star: {
      situation:
        'SFMS-SIGNER is a Spring Boot REST API handling PKCS#7 digital signature generation and token-based authentication for 230+ banks. The system had two client-flagged problems: bank operators were required to manually enter token slot IDs and vendor library paths \u2014 low-level PKCS#11 details most banking staff had no context for \u2014 generating constant support incidents; and signing response time sat at ~200ms with a client request to reduce it. When we initiated the JDK 8 \u2192 JDK 17 migration, the existing PKCS#11 integration broke entirely due to Java 17\u2019s strong module encapsulation, making both problems urgent simultaneously.',
      task:
        'Research, architect, and implement a path to restore PKCS#11 integration under Java 17 \u2014 and use the forced rearchitecture as the opportunity to close both pre-existing problems.',
      action:
        'I started with the standard path: researching Java 17\u2019s module system, configuring --add-exports flags, attempting to make the existing SunPKCS11 provider work. The research phase consumed several weeks because almost no documentation existed for this specific combination \u2014 PKCS#11 hardware token integration under Java 17\u2019s module system in a production banking context. Basic signing came back online, but when I pushed into the token management functionality we needed \u2014 automatic slot detection, dynamic enumeration, mapping tokens without user input \u2014 I hit a hard wall. SunPKCS11 is a cryptographic library, not a token management library. It exposes high-level crypto operations but deliberately doesn\u2019t surface native PKCS#11 calls like C_GetSlotList. I proposed building a custom PKCS#11 integration layer as a dedicated separate project, giving us direct access to native token libraries and full control over slot detection, provider initialization, and session handling. While designing it, I identified the root cause of the 200ms latency: the legacy code was reinitializing PKCS#11 providers and cryptographic sessions on every request, with redundant certificate metadata lookups per call. Having full control over the custom layer let me fix both \u2014 I introduced certificate metadata caching and token initiation call caching, eliminating the redundant work.',
      result:
        'Over a 3\u20134 month cycle, signing response time dropped from ~200ms to 100\u2013120ms, validated through personal UAT benchmarking then deployed to production. Token onboarding no longer required bank operators to know slot IDs or vendor library paths \u2014 automatic detection handled it entirely. Client feedback during UAT: bank users had stopped raising token configuration issues, and described the signing flow as noticeably more stable, faster, and easier to operate. The improvement held in production, and the platform was positioned for AES-GCM and future PQC work.',
    },
  },

  {
    id: 'certificate-governance',
    index: '03',
    year: '2024',
    org: 'TCS',
    title: 'Certificate Governance Initiative',
    oneLine:
      'Driving ASN.1 / RFC-compliant signatures across 60+ independent banks.',
    metrics: [
      '7-month coordination \u00b7 ~55 of 60+ banks remediated',
      'SHA256WithRSA enforcement \u00b7 detached signatures',
      'Mentored 10\u201315 associates across rollout',
    ],
    tags: [
      'PKI Governance',
      'ASN.1',
      'RFC 5485 / 3279 / 5912',
      'Cross-org Leadership',
    ],
    earnedSecret:
      'Technical demonstrations moved about half the banks. The other half moved when they understood what non-compliance would cost them operationally. When you\u2019re coordinating cryptographic changes across independent organizations, the technical case gets you compliance from the willing. The operational consequence gets you compliance from everyone else.',
    star: {
      situation:
        'SFMS 8.0 was a major security modernization \u2014 upgrading cryptographic components, modernizing the SFMS Signer, and enforcing ASN.1 / RFC-compliant digital signature standards across the banking ecosystem. The problem: 60+ independent banks had built their SFMS signature implementations differently, each with its own core banking systems, development teams, middleware, and levels of cryptographic awareness. Many used weak algorithms like MD5WithRSA or SHA1WithRSA. Some violated ASN.1 encoding rules around signed-attribute ordering. Some generated attached signatures instead of detached, breaking SFMS validation. Most bank SPOCs had no deep familiarity with PKI internals, RFC standards, or ASN.1 encoding.',
      task:
        'Serve as the primary technical coordination lead for the certificate-governance and ASN.1 compliance initiative across all 60+ banks. Each bank\u2019s SPOC came directly to me for issue reproduction, root-cause analysis, RFC/ASN.1 guidance, validation support, and migration coordination \u2014 with no direct authority over any of them and a fixed 7-month timeline.',
      action:
        'The approach that worked was technical demonstration combined with strategic operational framing. For the resistant majority, I reproduced the exact validation failures in the SFMS ecosystem: showing how ASN.1 attribute ordering issues caused signature parsing inconsistencies, how attached signatures failed SFMS validation, why MD5WithRSA created security and audit exposure. Seeing the specific failure \u2014 not being told about it \u2014 shifted conversations. For those who still pushed back, I translated the risk into business terms: SFMS is a shared banking network where every bank must follow the same standards so signatures can be trusted and validated consistently. I worked directly with each bank\u2019s SPOC and development team through UAT \u2014 sharing sample compliant signatures, guiding configuration and library-level fixes, supporting retesting cycles. I mentored 10\u201315 associates across support, maintenance, upgrade, and development teams to scale the coordination. The second lever that unlocked the remaining holdouts was the SFMS 8.0 upgrade dependency: non-compliant implementations would not be supported in future SFMS releases. Banks that wouldn\u2019t move for security reasons moved immediately when they understood the operational consequence.',
      result:
        'Over 7 months, approximately 55 of the 60+ banks achieved compliance within the planned migration timeline \u2014 including ICICI, HDFC, and Axis Bank, which resolved their issues early. The remaining banks came into compliance through additional follow-up and dedicated SPOC coordination. No bank was left non-compliant at the close of the initiative. The work was a central contribution to the SFMS 8.0 security modernization and was recognized as part of the TCS Beyond Excellence Award.',
    },
  },

  {
    id: 'cve-2020-11814',
    index: '04',
    year: '2024',
    org: 'TCS',
    title: 'CVE-2020-11814 Remediation',
    oneLine:
      'Host Header Injection mitigation in production banking infrastructure.',
    metrics: [
      '7-day reproduce-to-rollout cycle',
      'Spring MVC filter \u00b7 Burp Suite reproduction',
      'Trust-boundary-aware remediation design',
    ],
    tags: ['Vulnerability Remediation', 'Spring MVC', 'Security Engineering'],
    earnedSecret:
      'When you get a CVE report, the instinct is to match the description to your code and fix what matches. That instinct leads you wrong in enterprise systems. A CVE describes a vulnerability class, not your deployment. Getting that question right first is what separates targeted remediation from security theater.',
    star: {
      situation:
        'SFMS handles high-volume financial messaging across 230+ banks under strict security requirements. During a security review, the client reported CVE-2020-11814 \u2014 an HTTP Host Header Injection vulnerability rated CVSS 5.4 (Medium) by NVD. In a banking environment where network conditions must be assumed hostile and downstream integrations span hundreds of institutions, the potential for Host header manipulation \u2014 enabling redirect abuse, cache poisoning, or forged URL generation \u2014 warranted higher operational priority than the raw score suggested.',
      task:
        'Investigate the vulnerability, reproduce it in our environment, and \u2014 once the attack surface was mapped \u2014 own the full remediation design, implementation, testing, and formal closure.',
      action:
        'My technical lead and I started by refusing to accept the CVE description at face value. Instead of immediately patching, we reproduced the attack using Burp Suite \u2014 manipulating Host headers in HTTP requests and tracing how modified values propagated through the application and downstream components. The reproduction revealed something important: the vulnerability wasn\u2019t exploitable in exactly the way the CVE described. Downstream banking-network controls and deployment-layer restrictions already limited certain attack paths. Once I had that framing, the investigation became targeted rather than reactive. I took ownership of the remediation design and implemented a Spring MVC filter enforcing strict Host header validation \u2014 accepting requests only from trusted localhost-based routing patterns rather than arbitrary IP-based host-header values. The first version was too restrictive: legitimate internal requests passing through proxy layers started failing. I redesigned the validation logic to block untrusted and malformed host headers while explicitly preserving the legitimate internal routing behavior the application depended on \u2014 then tested the revised filter carefully across environments before rollout.',
      result:
        'Over 7 days \u2014 from initial Burp Suite reproduction to production rollout \u2014 the vulnerability was fully remediated. The revised fix passed internal validation, was reviewed and approved, and the client independently verified the mitigation using their own security testing methodology. The vulnerability was formally closed.',
    },
  },

  {
    id: 'pqc-benchmarking',
    index: '05',
    year: '2025',
    org: 'TCS',
    title: 'Post-Quantum Cryptography Benchmarking',
    oneLine:
      'Self-initiated PQC feasibility study against SFMS-scale workloads.',
    metrics: [
      'ML-KEM \u00b7 ML-DSA benchmarked vs. RSA / ECC baseline',
      'Presented to TCS NGM India leadership',
      'Inspired the Secure Hybrid Crypto Engine',
    ],
    tags: [
      'ML-KEM (FIPS 203)',
      'ML-DSA (FIPS 204)',
      'Crypto-agility',
      'Hybrid Cryptography',
    ],
    earnedSecret:
      'Most engineers benchmarking PQC ask \u201cis ML-DSA fast enough?\u201d That\u2019s the wrong question. The algorithm is ready. The infrastructure around it \u2014 your CA, your HSMs, your certificate storage, your serialization layers \u2014 almost certainly isn\u2019t. PQC migration is a PKI ecosystem problem, not a cryptographic algorithm problem.',
    star: {
      situation:
        'While leading cryptographic modernization on SFMS \u2014 the AES-GCM migration, JDK 17 upgrade, HSM improvements \u2014 I noticed the team was building strong crypto-agility foundations but had no visibility into where post-quantum cryptography fit in that roadmap. NIST had just standardized ML-KEM (FIPS 203) and ML-DSA (FIPS 204). SFMS supports 230+ banks at high daily transaction volumes \u2014 exactly the kind of infrastructure that faces serious disruption if quantum computing advances outpace cryptographic preparedness. No one in the organization was tracking PQC implications for the platform.',
      task:
        'Propose and drive a self-initiated benchmarking initiative to determine whether ML-DSA and ML-KEM could realistically operate within SFMS-scale financial workloads \u2014 and build internal and client awareness of the long-term migration implications before the organization found itself unprepared.',
      action:
        'I designed and ran benchmarking experiments using the Bouncy Castle PQC implementation, testing ML-DSA and ML-KEM against the existing RSA and ECC baseline at simulated production-level concurrent transaction volumes. My focus wasn\u2019t raw cryptographic speed \u2014 it was enterprise feasibility and infrastructure impact. The findings made clear the algorithm-level question was the wrong one. ML-DSA certificates and signatures were several times larger than RSA/ECC equivalents, immediately making certificate storage, network bandwidth, and message-payload constraints central concerns. Trust-chain handling grew heavier. HSMs optimized for RSA/ECC workflows weren\u2019t ready for new key types. ML-DSA verification was better than expected under batch workloads \u2014 encouraging for banking environments where verification dominates \u2014 but key generation and signing were noticeably slower than ECC under concurrent simulation. The second conclusion followed: hybrid cryptography \u2014 running classical and post-quantum algorithms in parallel \u2014 is the only practical migration path for financial systems during transition. I documented the full analysis and presented it to the development team, architects, client stakeholders, and senior leadership including the head of TCS NGM India.',
      result:
        'The presentation didn\u2019t produce an immediate implementation mandate \u2014 PQC adoption in banking is still early globally. But it produced what mattered: leadership and client stakeholders formally acknowledged that quantum-safe migration will eventually be necessary, that the CA and PKI ecosystem will be central to that transition, and that hybrid cryptography is the safest initial approach. Internal alignment formed around continuing to monitor PQC maturity alongside evolving NIST standards. The work transformed PQC from an abstract research topic into a tracked strategic consideration. The benchmarking also directly inspired the Secure Hybrid Crypto Engine \u2014 a personal crypto-agility prototype combining RSA, ECDSA, AES-GCM, ML-KEM, and ML-DSA.',
    },
    links: [
      {
        label: 'Secure Hybrid Crypto Engine',
        href: 'https://github.com/sai-keerthan/secure-hybrid-crypto-engine',
      },
    ],
  },
]
