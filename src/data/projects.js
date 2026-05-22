// Selected Work — five project case studies.
// Single source of truth for both the card grid and the modal.
//
// NOTE: System names, institution names, and certain implementation
// specifics are intentionally genericized for confidentiality. The
// engineering substance is preserved; identifying details are not.

export const projects = [
  {
    id: 'authenticated-encryption-migration',
    index: '01',
    year: '2024',
    org: 'TCS',
    title: 'Authenticated Encryption Migration',
    oneLine:
      'Modernizing the cryptographic trust foundation of a national financial messaging platform.',
    metrics: [
      '200+ institutions \u00b7 zero downtime',
      'Legacy cipher \u2192 modern authenticated encryption',
      'Phased, routing-aware rollout',
    ],
    tags: ['Cryptography', 'Migration Engineering', 'Crypto Libraries', 'PKI'],
    earnedSecret:
      'In legacy financial systems, the most dangerous code isn\u2019t buggy code \u2014 it\u2019s code that\u2019s still running for responsibilities that no longer exist. When I reverse-engineered the platform, I found trust-authority logic still partially active for functions that had been operationally handed off to another body roughly a decade earlier. The handoff was never documented, never reflected in the codebase \u2014 just silently embedded for years. That kind of undocumented operational debt is what makes legacy modernization genuinely hard: not the algorithm upgrade, but mapping what the system thinks it still does versus what it actually stopped doing years ago.',
    star: {
      situation:
        'A national financial messaging platform \u2014 the cryptographic backbone used by a financial regulator and 200+ member institutions for secure cross-institutional communication \u2014 relied on a legacy symmetric cipher flagged for cryptographic weakness and compliance risk. The codebase was undocumented, heavily patched, and built on a version of its cryptographic library that did not support modern authenticated encryption. I was the only engineer with ownership of the cryptographic modules.',
      task:
        'Design and deliver a migration from the legacy cipher to a modern authenticated-encryption standard across the entire network without disrupting active operations. A failed migration could disrupt financial settlements, trigger regulatory escalation, and cascade payment failures across every node simultaneously.',
      action:
        'I started by reverse-engineering the undocumented legacy codebase \u2014 tracing hidden dependencies, mapping the trust chain, identifying critical components. During this process I made a discovery not in any handover document: portions of obsolete trust-authority logic were still present and partially active in the codebase, even though that responsibility had been operationally handed off to another body roughly a decade earlier. The operational transition had never been reflected in the code \u2014 signing and certificate-processing flows still contained logic that assumed responsibilities which no longer existed in the real architecture. I identified and removed the obsolete code, which simplified the signing and certificate-processing logic, reduced dependency complexity, and lowered migration risk. With the codebase properly mapped, I designed the migration strategy. Instead of a big-bang migration, I built a backward-compatible phased approach: migrated the central routing node first (since every transaction routes through it), built a dynamic routing mechanism so the platform could check whether each destination node supported the modern standard or still ran the legacy cipher and route accordingly, and directed the routing team to implement node-compatibility tracking with caching under my technical guidance. I designed all edge cases, guided the testing team on cryptographic test scenarios, and handled all stakeholder and partner communication \u2014 translating cryptographic failure modes into language non-technical partners could act on.',
      result:
        'All 200+ member institutions successfully migrated to the modern authenticated-encryption standard with zero transaction outages. The phased approach reduced deployment complexity by 50% compared to a simultaneous migration. Legacy and modern nodes coexisted safely throughout. Recognized with the TCS Beyond Excellence Award.',
    },
  },

  {
    id: 'signing-service-modernization',
    index: '02',
    year: '2024',
    org: 'TCS',
    title: 'Signing Service \u2014 Runtime Modernization',
    oneLine:
      'A custom hardware-token integration layer when the standard provider hit its architectural ceiling.',
    metrics: [
      '~200ms \u2192 100\u2013120ms signing latency',
      '200+ institutions impacted',
      '3\u20134 month research \u2192 production cycle',
    ],
    tags: ['Java Runtime', 'Hardware Tokens', 'HSM', 'Spring Boot', 'Performance'],
    earnedSecret:
      'The standard cryptographic provider will get you to working crypto \u2014 but the moment you need to manage hardware tokens rather than just use them, you\u2019ve hit its permanent ceiling. Cryptographic operations and token orchestration are fundamentally different use cases, and that distinction is invisible until it blocks you. The forced runtime migration became the opportunity.',
    star: {
      situation:
        'The digital signing service is a Spring Boot REST API handling digital signature generation and token-based authentication for 200+ member institutions. The system had two client-flagged problems: operators were required to manually enter low-level hardware-token details most staff had no context for, generating constant support incidents; and signing response time sat at ~200ms with a client request to reduce it. When we initiated a major Java runtime upgrade, the existing hardware-token integration broke entirely due to the new runtime\u2019s strong module encapsulation, making both problems urgent simultaneously.',
      task:
        'Research, architect, and implement a path to restore hardware-token integration under the new Java runtime \u2014 and use the forced rearchitecture as the opportunity to close both pre-existing problems.',
      action:
        'I started with the standard path: researching the new runtime\u2019s module system, configuring the relevant export flags, attempting to make the existing standard provider work. The research phase consumed several weeks because almost no documentation existed for this specific combination \u2014 hardware-token integration under the new module system in a production financial context. Basic signing came back online, but when I pushed into the token management functionality we needed \u2014 automatic token detection, dynamic enumeration, mapping tokens without user input \u2014 I hit a hard wall. The standard provider is a cryptographic library, not a token management library. It exposes high-level crypto operations but deliberately doesn\u2019t surface the native calls required for token orchestration. I proposed building a custom hardware-token integration layer as a dedicated separate project, giving us direct access to native token libraries and full control over token detection, provider initialization, and session handling. While designing it, I identified the root cause of the latency: the legacy code was reinitializing cryptographic providers and sessions on every request, with redundant certificate metadata lookups per call. Having full control over the custom layer let me fix both \u2014 I introduced certificate metadata caching and token initiation caching, eliminating the redundant work.',
      result:
        'Over a 3\u20134 month cycle, signing response time dropped from ~200ms to 100\u2013120ms, validated through personal UAT benchmarking then deployed to production. Token onboarding no longer required operators to know low-level hardware details \u2014 automatic detection handled it entirely. Client feedback during UAT: users had stopped raising token configuration issues, and described the signing flow as noticeably more stable, faster, and easier to operate. The improvement held in production, and the platform was positioned for the encryption migration and future post-quantum work.',
    },
  },

  {
    id: 'certificate-governance',
    index: '03',
    year: '2024',
    org: 'TCS',
    title: 'Certificate Governance Initiative',
    oneLine:
      'Driving standards-compliant digital signatures across 60+ independent institutions.',
    metrics: [
      '7-month coordination \u00b7 ~55 of 60+ institutions remediated',
      'Strong-hash signature enforcement \u00b7 detached signatures',
      'Mentored 10\u201315 associates across rollout',
    ],
    tags: [
      'PKI Governance',
      'ASN.1',
      'Signature Standards',
      'Cross-org Leadership',
    ],
    earnedSecret:
      'Technical demonstrations moved about half the institutions. The other half moved when they understood what non-compliance would cost them operationally. When you\u2019re coordinating cryptographic changes across independent organizations, the technical case gets you compliance from the willing. The operational consequence gets you compliance from everyone else.',
    star: {
      situation:
        'A major platform security release modernized cryptographic components, upgraded the signing service, and enforced standards-compliant digital signature requirements across the ecosystem. The problem: 60+ independent member institutions had built their signature implementations differently, each with its own core systems, development teams, middleware, and levels of cryptographic awareness. Many used weak hashing algorithms. Some violated signature-encoding rules around signed-attribute ordering. Some generated attached signatures instead of detached, breaking validation. Most institution points-of-contact had no deep familiarity with PKI internals, signature standards, or encoding rules.',
      task:
        'Serve as the primary technical coordination lead for the certificate-governance and signature-compliance initiative across all 60+ institutions. Each institution\u2019s point-of-contact came directly to me for issue reproduction, root-cause analysis, standards guidance, validation support, and migration coordination \u2014 with no direct authority over any of them and a fixed 7-month timeline.',
      action:
        'The approach that worked was technical demonstration combined with strategic operational framing. For the resistant majority, I reproduced the exact validation failures: showing how signature-encoding ordering issues caused parsing inconsistencies, how attached signatures failed validation, why weak hashing created security and audit exposure. Seeing the specific failure \u2014 not being told about it \u2014 shifted conversations. For those who still pushed back, I translated the risk into business terms: a shared network where every participant must follow the same standards so signatures can be trusted and validated consistently. I worked directly with each institution\u2019s point-of-contact and development team through UAT \u2014 sharing sample compliant signatures, guiding configuration and library-level fixes, supporting retesting cycles. I mentored 10\u201315 associates across support, maintenance, upgrade, and development teams to scale the coordination. The second lever that unlocked the remaining holdouts was the platform upgrade dependency: non-compliant implementations would not be supported in future releases. Institutions that wouldn\u2019t move for security reasons moved immediately when they understood the operational consequence.',
      result:
        'Over 7 months, approximately 55 of the 60+ institutions achieved compliance within the planned migration timeline, with several resolving their issues early. The remaining institutions came into compliance through additional follow-up and dedicated coordination. No institution was left non-compliant at the close of the initiative. The work was a central contribution to the platform security release.',
    },
  },

  {
    id: 'web-layer-vulnerability-remediation',
    index: '04',
    year: '2024',
    org: 'TCS',
    title: 'Web-Layer Vulnerability Remediation',
    oneLine:
      'Trust-boundary-aware mitigation of a web-layer vulnerability in production financial infrastructure.',
    metrics: [
      '7-day reproduce-to-rollout cycle',
      'Spring MVC filter \u00b7 controlled reproduction',
      'Trust-boundary-aware remediation design',
    ],
    tags: ['Vulnerability Remediation', 'Spring MVC', 'Security Engineering'],
    earnedSecret:
      'When you get a vulnerability report, the instinct is to match the description to your code and fix what matches. That instinct leads you wrong in enterprise systems. A vulnerability report describes a vulnerability class, not your deployment. Getting that question right first is what separates targeted remediation from security theater.',
    star: {
      situation:
        'A production financial messaging platform handles high-volume messaging across 200+ member institutions under strict security requirements. During a security review, the client reported a medium-severity web-layer vulnerability. In an environment where network conditions must be assumed hostile and downstream integrations span hundreds of institutions, the potential for the vulnerability to enable redirect abuse, cache poisoning, or forged URL generation warranted higher operational priority than the raw severity score suggested.',
      task:
        'Investigate the vulnerability, reproduce it in our environment, and \u2014 once the attack surface was mapped \u2014 own the full remediation design, implementation, testing, and formal closure.',
      action:
        'My technical lead and I started by refusing to accept the vulnerability description at face value. Instead of immediately patching, we reproduced the issue in a controlled test \u2014 manipulating the relevant request inputs and tracing how modified values propagated through the application and downstream components. The reproduction revealed something important: the vulnerability wasn\u2019t exploitable in exactly the way the report described. Downstream network controls and deployment-layer restrictions already limited certain attack paths. Once I had that framing, the investigation became targeted rather than reactive. I took ownership of the remediation design and implemented a Spring MVC filter enforcing strict input validation \u2014 accepting requests only from trusted internal routing patterns rather than arbitrary values. The first version was too restrictive: legitimate internal requests passing through proxy layers started failing. I redesigned the validation logic to block untrusted and malformed input while explicitly preserving the legitimate internal routing behavior the application depended on \u2014 then tested the revised filter carefully across environments before rollout.',
      result:
        'Over 7 days \u2014 from initial controlled reproduction to production rollout \u2014 the vulnerability was fully remediated. The revised fix passed internal validation, was reviewed and approved, and the client independently verified the mitigation using their own security testing methodology. The vulnerability was formally closed.',
    },
  },

  {
    id: 'pqc-benchmarking',
    index: '05',
    year: '2025',
    org: 'TCS',
    title: 'Post-Quantum Cryptography Benchmarking',
    oneLine:
      'Self-initiated PQC feasibility study against enterprise-scale financial workloads.',
    metrics: [
      'ML-KEM \u00b7 ML-DSA benchmarked vs. RSA / ECC baseline',
      'Presented to senior leadership',
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
        'While leading cryptographic modernization on a national financial messaging platform \u2014 the encryption migration, the Java runtime upgrade, HSM improvements \u2014 I noticed the team was building strong crypto-agility foundations but had no visibility into where post-quantum cryptography fit in that roadmap. NIST had just standardized ML-KEM (FIPS 203) and ML-DSA (FIPS 204). The platform supports 200+ member institutions at high daily transaction volumes \u2014 exactly the kind of infrastructure that faces serious disruption if quantum computing advances outpace cryptographic preparedness. No one in the organization was tracking PQC implications for the platform.',
      task:
        'Propose and drive a self-initiated benchmarking initiative to determine whether ML-DSA and ML-KEM could realistically operate within enterprise-scale financial workloads \u2014 and build internal and client awareness of the long-term migration implications before the organization found itself unprepared.',
      action:
        'I designed and ran benchmarking experiments using an open-source PQC implementation, testing ML-DSA and ML-KEM against the existing RSA and ECC baseline at simulated production-level concurrent transaction volumes. My focus wasn\u2019t raw cryptographic speed \u2014 it was enterprise feasibility and infrastructure impact. The findings made clear the algorithm-level question was the wrong one. ML-DSA certificates and signatures were several times larger than RSA/ECC equivalents, immediately making certificate storage, network bandwidth, and message-payload constraints central concerns. Trust-chain handling grew heavier. HSMs optimized for RSA/ECC workflows weren\u2019t ready for new key types. ML-DSA verification was better than expected under batch workloads \u2014 encouraging for environments where verification dominates \u2014 but key generation and signing were noticeably slower than ECC under concurrent simulation. The second conclusion followed: hybrid cryptography \u2014 running classical and post-quantum algorithms in parallel \u2014 is the only practical migration path for financial systems during transition. I documented the full analysis and presented it to the development team, architects, client stakeholders, and senior leadership.',
      result:
        'The presentation didn\u2019t produce an immediate implementation mandate \u2014 PQC adoption in finance is still early globally. But it produced what mattered: leadership and client stakeholders formally acknowledged that quantum-safe migration will eventually be necessary, that the CA and PKI ecosystem will be central to that transition, and that hybrid cryptography is the safest initial approach. Internal alignment formed around continuing to monitor PQC maturity alongside evolving NIST standards. The work transformed PQC from an abstract research topic into a tracked strategic consideration. The benchmarking also directly inspired the Secure Hybrid Crypto Engine \u2014 a personal crypto-agility prototype combining RSA, ECDSA, AES-GCM, ML-KEM, and ML-DSA.',
    },
    links: [
      {
        label: 'Secure Hybrid Crypto Engine',
        href: 'https://github.com/sai-keerthan/secure-hybrid-crypto-engine',
      },
    ],
  },

  {
    id: 'hsm-compatibility-bridge',
    index: '06',
    year: '2024',
    org: 'TCS',
    title: 'HSM Compatibility Bridge',
    oneLine:
      'Decomposing the HSM trust model to unblock AES-GCM adoption without hardware replacement.',
    metrics: [
      'Hundreds of thousands of settlement transactions daily',
      'Zero HSM replacement \u00b7 zero operational disruption',
      'Validated across dev, UAT, pre-prod, production',
    ],
    tags: ['HSM Integration', 'Envelope Encryption', 'PKCS#11', 'AES-GCM'],
    earnedSecret:
      'When an HSM can\u2019t perform a modern crypto operation, the instinct is to ask \u201chow do we replace it?\u201d That\u2019s the wrong question. In hybrid encryption, the HSM\u2019s actual job is to guard the private key \u2014 not to own every cryptographic operation. Once I decomposed the trust model, it was clear: the HSM needed to decrypt the CEK. Everything after that \u2014 payload decryption using an ephemeral CEK inside a trusted process \u2014 was never the HSM\u2019s security responsibility. The constraint didn\u2019t force a workaround; it forced a clearer reading of the architecture.',
    star: {
      situation:
        'During the platform-wide authenticated-encryption migration, we hit a critical interoperability issue in one of the high-value settlement environments: the HSM deployed there did not support AES-GCM decryption. The settlement network processes hundreds of thousands of high-value transactions daily \u2014 operational disruption was not acceptable. The existing architecture used a hybrid envelope-encryption structure: a Content Encryption Key (CEK) for encrypting the payload, and a Key Encryption Key (KEK) for encrypting the CEK itself, with the KEK protected by HSM-backed asymmetric private keys via PKCS#11.',
      task:
        'Design a migration-compatible solution that would enable AES-GCM adoption in the settlement environment without requiring HSM replacement or disrupting live operations \u2014 balancing security modernization, HSM limitations, and operational continuity.',
      action:
        'I started by deeply analyzing the envelope-encryption structure and the hybrid cryptographic flow in use. The key insight came from decomposing the trust model: the HSM\u2019s actual security function was to protect the private key used for KEK-level decryption \u2014 not to perform symmetric payload decryption itself. Once I saw that boundary clearly, I designed a compatibility approach: the encrypted payload and encrypted CEK were separated; the HSM continued handling KEK-level CEK decryption through the existing PKCS#11 integration (vendor-specific library and Java authentication provider); once the CEK was safely decrypted inside the trusted application boundary, Java\u2019s native AES-GCM implementation decrypted the actual payload \u2014 outside the HSM. This preserved the existing hybrid-encryption trust model \u2014 the private key never left the HSM, the CEK existed only ephemerally inside the trusted process \u2014 while eliminating any dependency on the HSM\u2019s unsupported GCM functionality.',
      result:
        'The solution was validated across developer, multiple UAT, and pre-production environments before being deployed to production. The high-value settlement network now processes hundreds of thousands of transactions daily with every decryption passing through this AES-GCM compatibility bridge. AES-GCM adoption achieved for critical settlement systems \u2014 no HSM replacement, no operational disruption.',
    },
  },
]
