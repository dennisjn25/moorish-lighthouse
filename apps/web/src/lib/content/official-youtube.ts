import type { Video } from "./types";

const youtubeSource = {
  checkedAt: "2026-08-12",
  kind: "official" as const,
  label: "Moorish Lighthouse official YouTube channel",
  url: "https://www.youtube.com/@moorishlighthouse",
};

// Summaries, takeaways, and excerpts are grounded in transcripts from the official channel.
// They describe the creator's presentation and do not independently validate legal or historical claims.
export const officialYoutubeVideos: Video[] = [
  {
    id: "aCfayznQ7hQ",
    title: "The Truth About The Republican Party",
    slug: "the-truth-about-the-republican-party",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse argues that familiar partisan accounts of the Republican Party and Lincoln omit a larger struggle over representative government, linking its interpretation to Jesuit influence, the Civil War, Reconstruction, and the 14th Amendment.",
    takeaways: [
      "Moorish Lighthouse frames the video as a history lesson for Black Republicans.",
      "The channel argues that Lincoln's emancipation policy chiefly served preservation of the Union.",
      "The channel portrays the 14th Amendment as a centralizing measure that undermined republican government.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:23",
        text: "voting for Democrats so in this video",
      },
      {
        timestamp: "9:05",
        text: "Paramount object in this struggle is to",
      },
      {
        timestamp: "9:35",
        text: "children horse for centralization",
      },
    ],
    duration: "9:58",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=aCfayznQ7hQ",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "cogdl0JcDAI",
    title: "Trump Ending Reproductive Rights?!",
    slug: "trump-ending-reproductive-rights",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse examines abortion politics after Trump's election, arguing that reproductive rights should be understood as civil rights created and regulated by law, while presenting Dobbs as a return of abortion policy to voters and state representatives.",
    takeaways: [
      "Moorish Lighthouse distinguishes civil rights from what it calls absolute rights.",
      "The channel argues that legally created rights remain subject to legal regulation or withdrawal.",
      "The channel presents partisan conflict over abortion as a distraction from civic self-government.",
    ],
    transcriptEvidence: [
      {
        timestamp: "3:08",
        text: "Rights are and Reproductive Rights are",
      },
      {
        timestamp: "3:32",
        text: "and in person's enjoyment thereof is",
      },
      {
        timestamp: "6:23",
        text: "authority to regulate abortion is return",
      },
    ],
    duration: "9:51",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=cogdl0JcDAI",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "L25wfLXytYE",
    title: "The 14th Amendment and Modern Politics",
    slug: "the-14th-amendment-and-modern-politics",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse argues that the 14th Amendment reshaped citizenship and shifted power from states to the federal government, then connects that interpretation to modern disputes over abortion and presidential eligibility.",
    takeaways: [
      "Moorish Lighthouse says the amendment created or recognized a distinct federal citizenship.",
      "The channel argues that this change elevated federal power over state sovereignty.",
      "The channel uses abortion and Trump eligibility cases as examples of the amendment's modern reach.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:23",
        text: "to special mention it creates or",
      },
      {
        timestamp: "3:27",
        text: "Amendment did was tip to scale of power",
      },
      {
        timestamp: "8:46",
        text: "decided March 4th 2024 Donald J Trump",
      },
    ],
    duration: "9:59",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=L25wfLXytYE",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "_o3n6QFnYs8",
    title: "The Truth About the Birth Certificate",
    slug: "the-truth-about-the-birth-certificate",
    topicSlug: "foundations",
    summary:
      "Moorish Lighthouse argues that birth certificates and Social Security records should be interpreted through banking and commercial terminology, using document formatting, registrar language, identification numbers, and federal definitions to support that view.",
    takeaways: [
      "Moorish Lighthouse points to capitalized names, barcodes, bond paper, and printers as commercial indicators.",
      "The channel links birth-certificate records and Social Security numbers to an alleged artificial entity.",
      "The channel promotes opting out of birth-certificate and Social Security applications for newborns.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:23",
        text: "that all birth certificate have these",
      },
      {
        timestamp: "2:28",
        text: "registered entity on the birth",
      },
      {
        timestamp: "5:36",
        text: "thing that I did which was have my",
      },
    ],
    duration: "6:06",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=_o3n6QFnYs8",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "OFHqnw0mHiE",
    title: "Property Tax is a Fraud!",
    slug: "property-tax-is-a-fraud",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse argues that property taxation reflects a shift from allodial to feudal landholding, drawing on legal-dictionary definitions, state constitutional language, commercial terminology, and a claimed 1913-to-1933 transition.",
    takeaways: [
      "Moorish Lighthouse contrasts allodial ownership with feudal tenure and recurring obligations.",
      "The channel cites Arkansas, Wisconsin, and Minnesota constitutional language on allodial land.",
      "The channel claims commercial classification converts property rights into taxable activity.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:38",
        text: "allodium land held absolutely in one's",
      },
      {
        timestamp: "7:18",
        text: "Constitution which states this tenure of",
      },
      {
        timestamp: "9:32",
        text: "by the state all this is a conversion of",
      },
    ],
    duration: "9:54",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=OFHqnw0mHiE",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "VSRMeeFc8mc",
    title: "Adverse Possession is LAWFUL",
    slug: "adverse-possession-is-lawful",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse examines adverse-possession filings through Pennsylvania and other state sources, argues that affidavits may support a recorded claim or color-of-title theory, and interviews claimants working on an abandoned mansion.",
    takeaways: [
      "Moorish Lighthouse searches Pennsylvania statutes for provisions about recording adverse-possession affidavits.",
      "The channel proposes that an affidavit could support a color-of-title argument, while noting courts decide that question.",
      "The channel's guests describe researching ownership, maintaining a vacant property, and facing a competing claimant.",
    ],
    transcriptEvidence: [
      {
        timestamp: "1:19",
        text: "read why so 21 Pennsylvania statute",
      },
      {
        timestamp: "11:00",
        text: "a question of law to be determined by",
      },
      {
        timestamp: "17:07",
        text: "the necessary stuff finding out who",
      },
    ],
    duration: "23:42",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=VSRMeeFc8mc",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "sdPMxrT3jSw",
    title: "50 Acres of Land Claimed Using Adverse Possession",
    slug: "50-acres-of-land-claimed-using-adverse-possession",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse presents a testimonial from a participant who says she obtained stamped paperwork connected to roughly 55 acres after researching adverse possession, buying the channel's ebook, and joining its private group.",
    takeaways: [
      "Moorish Lighthouse's guest says the listed owner had died decades earlier and an heir declined involvement.",
      "The guest describes the process as risky but says research increased her confidence.",
      "The guest credits the ebook and group with helping organize her property research.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:04",
        text: "office and I got everything stamped for",
      },
      {
        timestamp: "1:28",
        text: "you're taking a risk at doing it makes",
      },
      {
        timestamp: "2:31",
        text: "read your book everything like the",
      },
    ],
    duration: "2:53",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=sdPMxrT3jSw",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "TPs8I79BpGg",
    title: "Adverse Possession Success Story | Real Estate Strategy",
    slug: "adverse-possession-success-story-real-estate-strategy",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse examines whether an adverse-possession claimant must remain on a property continuously, using legal references and examples to argue that continuity depends on use, property type, and jurisdiction.",
    takeaways: [
      "Moorish Lighthouse argues that continuous possession need not mean constant physical presence.",
      "Moorish Lighthouse uses seasonal occupancy as an example of use that may remain continuous.",
      "Moorish Lighthouse stresses researching tax records and selecting genuinely vacant property.",
    ],
    transcriptEvidence: [
      {
        timestamp: "2:26",
        text: "continuous possession however need not",
      },
      {
        timestamp: "5:18",
        text: "the conclusion that summer occupancy",
      },
      {
        timestamp: "12:42",
        text: "go look at the tax information you can",
      },
    ],
    duration: "73:24",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=TPs8I79BpGg",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "8gkC2mYIspQ",
    title: "Man Claims 8 Properties Using Adverse Possession",
    slug: "man-claims-8-properties-using-adverse-possession",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse presents a group member's account of identifying eight properties connected to a trust, then evaluating vacancy, repairs, taxes, code compliance, and carrying costs before choosing which claims to pursue.",
    takeaways: [
      "Moorish Lighthouse recounts how trust documents led a member to multiple properties.",
      "Moorish Lighthouse highlights securing and assessing each property individually.",
      "Moorish Lighthouse emphasizes budgeting for repairs, taxes, utilities, and code work.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:35",
        text: "that will it created what they call",
      },
      {
        timestamp: "1:56",
        text: "house I was able to to take possession",
      },
      {
        timestamp: "2:07",
        text: "one assess the the repairs assess the",
      },
    ],
    duration: "4:32",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=8gkC2mYIspQ",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "RiRVEoNQvY4",
    title: "Adverse Possession: How People Can Benefit From It",
    slug: "adverse-possession-how-people-can-benefit-from-it",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse argues that adverse possession can offer a lower-cost, nontraditional path into housing, citing an article, barriers to conventional mortgages, and the host's account of occupying a tax-delinquent property.",
    takeaways: [
      "Moorish Lighthouse characterizes adverse possession as an inexpensive real-estate entry path.",
      "Moorish Lighthouse contrasts it with purchases involving contracts and consideration.",
      "Moorish Lighthouse says careful selection of abandoned property is central to the approach.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:18",
        text: "aders possession is literally the",
      },
      {
        timestamp: "0:41",
        text: "no contract exists no consideration",
      },
      {
        timestamp: "1:06",
        text: "correctly and claiming the right type of",
      },
    ],
    duration: "1:29",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=RiRVEoNQvY4",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "HW8yQPZFldQ",
    title: "Sovereign Citizens and the Right To Travel Part 2",
    slug: "sovereign-citizens-and-the-right-to-travel-part-2",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse continues its right-to-travel argument by discussing authority, color of law, licensing, and cited court language, while asserting that public regulation is often accepted through presumption and acquiescence.",
    takeaways: [
      "Moorish Lighthouse distinguishes asserted legal authority from what it calls color of law.",
      "Moorish Lighthouse links identification and licensing requirements to movement controls.",
      "Moorish Lighthouse argues that travel is a fundamental right rather than a licensed privilege.",
    ],
    transcriptEvidence: [
      {
        timestamp: "1:02",
        text: "and regular color of law the appearance",
      },
      {
        timestamp: "3:05",
        text: "identification papers happen everyday in",
      },
      {
        timestamp: "9:08",
        text: "know what the Constitution is and what",
      },
    ],
    duration: "9:33",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=HW8yQPZFldQ",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "3mf_sqK0eWY",
    title: "Sovereign Citizens and the Right to Travel Part 1",
    slug: "sovereign-citizens-and-the-right-to-travel-part-1",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse critiques portrayals of right-to-travel arguments, cites reference works and cases, and argues that legal sources support a distinction between ordinary travel and regulated commercial driving.",
    takeaways: [
      "Moorish Lighthouse says critics omit the case law behind right-to-travel claims.",
      "Moorish Lighthouse cites a source describing travel as a natural right protected by due process.",
      "Moorish Lighthouse argues that travel and commercial driving should be treated differently.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:48",
        text: "never cite the passages in which these",
      },
      {
        timestamp: "2:31",
        text: "federal court recognized the right to",
      },
      {
        timestamp: "4:31",
        text: "saying that they are traveling and not",
      },
    ],
    duration: "5:34",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=3mf_sqK0eWY",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "D92l_VrFBpM",
    title: "How To Deceive Black People",
    slug: "how-to-deceive-black-people",
    topicSlug: "foundations",
    summary:
      "Moorish Lighthouse examines welfare, civil-rights legislation, and nationality through a social-engineering framework, arguing that dependence and emotionally resonant reforms can preserve unequal power relationships.",
    takeaways: [
      "Moorish Lighthouse applies a power-and-dependence framework to the welfare state.",
      "Moorish Lighthouse characterizes civil rights as revocable privileges rather than inherent rights.",
      "Moorish Lighthouse links periods of civil unrest with subsequent civil-rights legislation.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:42",
        text: "the welfare state and how the welfare",
      },
      {
        timestamp: "2:13",
        text: "for which is civil rights is actually",
      },
      {
        timestamp: "4:24",
        text: "Civil Rights Act of 1960 all had the",
      },
    ],
    duration: "6:10",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=D92l_VrFBpM",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "NhCjaX1SYFU",
    title: "House For Free?!",
    slug: "house-for-free",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse promotes adverse possession as an alternative to mortgages and renting, asserting that claimed properties may support housing, rental income, or eventual resale after title proceedings.",
    takeaways: [
      "Moorish Lighthouse frames adverse possession as an alternative to mortgages and rent.",
      "Moorish Lighthouse asserts that properly structured properties can be leased to tenants.",
      "Moorish Lighthouse says a claimant may sell after obtaining clear title through a quiet-title suit.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:09",
        text: "absolute Game Changer when it comes to",
      },
      {
        timestamp: "0:51",
        text: "number three is passive income generator",
      },
      {
        timestamp: "1:00",
        text: "you gain clear titles to the property",
      },
    ],
    duration: "1:29",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=NhCjaX1SYFU",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "ZNAjhmZJ_BQ",
    title: "How To: Adverse Possession",
    slug: "how-to-adverse-possession",
    topicSlug: "property-research",
    summary:
      "Moorish Lighthouse examines adverse possession through its history, categories of found property, statutory treatment, and the acts the speaker says can begin an adverse claim, while repeatedly directing viewers toward abandoned property research.",
    takeaways: [
      "Moorish Lighthouse argues that the doctrine is easier to understand after studying its history.",
      "Moorish Lighthouse distinguishes abandoned property from lost, mislaid, and treasure-trove property.",
      "Moorish Lighthouse says an adverse-possession claim depends on possession and state-specific statutory rules.",
    ],
    transcriptEvidence: [
      {
        timestamp: "1:27",
        text: "it so people can get that Foundation",
      },
      {
        timestamp: "6:07",
        text: "categories of found property",
      },
      {
        timestamp: "37:26",
        text: "in order to initiate actual possession",
      },
    ],
    duration: "71:49",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=ZNAjhmZJ_BQ",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "T_vo-mMjNV4",
    title: "The truth about the word Black from Elijah Muhammad!",
    slug: "the-truth-about-the-word-black-from-elijah-muhammad",
    topicSlug: "foundations",
    summary:
      "Moorish Lighthouse compares statements attributed to Elijah Muhammad with teachings attributed to Noble Drew Ali, arguing that labels such as Black and Negro do not express nationality and advocating Moorish American identification.",
    takeaways: [
      "Moorish Lighthouse links Elijah Muhammad's description of Negro with Noble Drew Ali's teachings.",
      "Moorish Lighthouse argues that Black and Negro are labels rather than national identities.",
      "Moorish Lighthouse presents declaring Moorish American nationality as the preferred alternative.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:24",
        text: "and The Honorable Elijah Muhammad told",
      },
      {
        timestamp: "1:03",
        text: "are not Negroes blacks colored folks or",
      },
      {
        timestamp: "5:53",
        text: "to declare our nationality this is why",
      },
    ],
    duration: "6:30",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=T_vo-mMjNV4",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "CYNFujRhR2o",
    title: "Jay Williams RISK CAREER for Kyrie Irving",
    slug: "jay-williams-risk-career-for-kyrie-irving",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse responds to Jay Williams's defense of Kyrie Irving, framing it as an example of solidarity and principled public support, then encourages viewers to read across religious traditions for shared teachings.",
    takeaways: [
      "Moorish Lighthouse praises Jay Williams for publicly supporting Kyrie Irving.",
      "Moorish Lighthouse argues that solidarity can matter even when people disagree with Irving's remarks.",
      "Moorish Lighthouse encourages reading across traditions to identify common principles.",
    ],
    transcriptEvidence: [
      {
        timestamp: "4:43",
        text: "shout out to Jay Williams for actually",
      },
      {
        timestamp: "4:51",
        text: "it shows Unity it shows what Unity looks",
      },
      {
        timestamp: "6:52",
        text: "everyone knowledge is everywhere and the",
      },
    ],
    duration: "7:33",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=CYNFujRhR2o",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "8jhCE3BCxeQ",
    title:
      "Child Birth at Hospital Without Birth Certificate or Social Security Number",
    slug: "child-birth-at-hospital-without-birth-certificate-or-social-security-number",
    topicSlug: "civic-context",
    summary:
      "Moorish Lighthouse hosts a long discussion about the speakers' experiences with hospital childbirth without applying for a birth certificate or Social Security number, including forms, staff interactions, family pressure, and private recordkeeping.",
    takeaways: [
      "Moorish Lighthouse presents personal accounts of declining birth-certificate and Social Security applications after hospital delivery.",
      "Moorish Lighthouse urges viewers to scrutinize hospital forms and communicate their choices before delivery.",
      "Moorish Lighthouse emphasizes keeping family records rather than relying only on institutional documents.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:04",
        text: "deliver your baby at a hospital without",
      },
      {
        timestamp: "9:42",
        text: "you to agree to these forms and these",
      },
      {
        timestamp: "18:47",
        text: "how come we're not keeping records of",
      },
    ],
    duration: "106:48",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=8jhCE3BCxeQ",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "O6y-G0E_R-E",
    title: 'Black Lives Matter: The truth about the word "black"',
    slug: "black-lives-matter-the-truth-about-the-word-black",
    topicSlug: "foundations",
    summary:
      "Moorish Lighthouse critiques the use of Black as a collective identity, drawing on negative dictionary meanings and teachings attributed to Noble Drew Ali to argue that inherited racial labels should be replaced by Moorish American nationality.",
    takeaways: [
      "Moorish Lighthouse argues that dictionary meanings of Black make it an unsuitable identity label.",
      "Moorish Lighthouse characterizes Black and related labels as terms imposed through enslavement and denaturalization.",
      "Moorish Lighthouse presents Moorish American as the identity viewers should study instead.",
    ],
    transcriptEvidence: [
      {
        timestamp: "0:09",
        text: "meaning of black",
      },
      {
        timestamp: "3:42",
        text: "we are not negro black color",
      },
      {
        timestamp: "3:46",
        text: "those terms were given and placed on us",
      },
    ],
    duration: "5:22",
    level: "Foundations",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=O6y-G0E_R-E",
    source: youtubeSource,
    status: "published",
  },
  {
    id: "_h51g_HsZHM",
    title:
      "Moorish American: How to Nationalize, operate as a National, and Fundamental Principles of Law.",
    slug: "moorish-american-how-to-nationalize-operate-as-a-national-and-fundamental-princi",
    topicSlug: "foundations",
    summary:
      "Moorish Lighthouse discusses nationality, identity documents, employment and courtroom encounters with a newly conscious participant, arguing that Moorish principles must be studied, articulated, and applied in everyday civic situations.",
    takeaways: [
      "Moorish Lighthouse distinguishes the speakers' claimed Moorish American nationality from U.S. citizenship.",
      "Moorish Lighthouse argues that identity claims require study, documentation, and practical application.",
      "Moorish Lighthouse frames courtroom questions around jurisdiction, fair trial, conflict of interest, and an injured party.",
    ],
    transcriptEvidence: [
      {
        timestamp: "6:35",
        text: "moorish american nationals but i'm like",
      },
      {
        timestamp: "15:18",
        text: "to prove jurisdiction",
      },
      {
        timestamp: "23:02",
        text: "to stand on principles of fair trial",
      },
    ],
    duration: "89:04",
    level: "Developing",
    series: "Official channel",
    youtubeUrl: "https://www.youtube.com/watch?v=_h51g_HsZHM",
    source: youtubeSource,
    status: "published",
  },
];
