// Reel data: Huang exit / Musk reply. Timings are locked to the measured narration files.
// No dashes anywhere. Handle and fox mark only on the sign-off.
window.REEL = {
  dur: 31.4,
  xf: 0.24, // crossfade between scenes, seconds
  scenes: [
    { id: "hook", start: 0.0, end: 5.5, kind: "duo",
      photos: [
        { src: "../assets/huang_010.jpg", w: 640, x: -33, y: 0, ox: 0.47, oy: 0.4, name: "JENSEN HUANG" },
        { src: "../assets/musk_3x4.jpg", w: 1300, x: -278, y: 12, ox: 0.42, oy: 0.22, name: "ELON MUSK" }
      ],
      lines: [
        { t: "NVIDIA’S FOUNDER", at: -1 }, { t: "IS OUT.", at: -1 },
        { t: "MUSK SAYS", at: 0.95, acc: 1 }, { t: "HE’D HIRE HIM.", at: 1.1, acc: 1 }
      ] },
    { id: "musk", start: 5.5, end: 11.4, kind: "full",
      photos: [{ src: "../assets/musk_stage.jpg", w: 1640, x: -70, y: -30, ox: 0.22, oy: 0.16 }],
      lines: [
        { t: "ASKED TO HIRE HIM,", at: 5.6 }, { t: "MUSK SAID:", at: 5.78 },
        { t: "“THAT WOULD BE", at: 9.72, acc: 1 }, { t: "AN HONOR.”", at: 9.86, acc: 1 }
      ] },
    { id: "why", start: 11.4, end: 18.05, kind: "full",
      photos: [{ src: "../assets/huang_008.jpg", w: 1080, x: 0, y: -123, ox: 0.52, oy: 0.33 }],
      lines: [
        { t: "33 YEARS.", at: 11.5 }, { t: "ONE CEO.", at: 13.1 },
        { t: "NOW AN INTERIM.", at: 14.8, acc: 1 }
      ] },
    { id: "chair", start: 18.05, end: 24.65, kind: "full",
      photos: [{ src: "../assets/nvidia_hq.jpg", w: 2300, x: -1002, y: -465, ox: 0.74, oy: 0.7 }],
      lines: [
        { t: "NVIDIA NEVER HAD", at: 18.15 }, { t: "A BOARD CHAIR.", at: 18.33 },
        { t: "UNTIL THIS WEEK.", at: 22.5, acc: 1 }
      ] },
    { id: "read", start: 24.65, end: 28.35, kind: "duo",
      photos: [
        { src: "../assets/huang_008.jpg", w: 900, x: -156, y: -110, ox: 0.52, oy: 0.33 },
        { src: "../assets/musk_stage.jpg", w: 1500, x: -177, y: 0, ox: 0.3, oy: 0.16 }
      ],
      lines: [
        { t: "THE CHIPS", at: 24.75 }, { t: "DIDN’T CHANGE.", at: 24.9 },
        { t: "THE CONTROL", at: 26.55, acc: 1 }, { t: "LAYER DID.", at: 26.7, acc: 1 }
      ] },
    { id: "end", start: 28.35, end: 31.4, kind: "end",
      lines: [
        { t: "BUILD YOURS", at: 28.5 }, { t: "BEFORE YOU", at: 28.64 }, { t: "NEED IT.", at: 28.78, acc: 1 }
      ] }
  ],
  caps: [
    [0.25, 2.6, "Jensen Huang is out at Nvidia."],
    [2.88, 4.22, "And Elon Musk says"],
    [4.22, 5.34, "he’d hire him."],
    [5.7, 7.02, "Asked on X,"],
    [7.18, 9.36, "Musk answered in five words."],
    [9.82, 11.24, "That would be an honor."],
    [11.6, 12.94, "Thirty three years,"],
    [13.16, 14.38, "one CEO."],
    [14.86, 16.4, "Now an interim chief,"],
    [16.54, 17.9, "with earnings on Tuesday."],
    [18.25, 19.32, "Here’s what I’m watching."],
    [19.86, 22.08, "Nvidia never had a board chair."],
    [22.55, 24.5, "It named its first one this week."],
    [24.85, 26.3, "The chips didn’t change."],
    [26.63, 27.98, "The control layer did."],
    [28.49, 30.4, "Build yours before you need it."]
  ],
  credits: [
    "Photos via Wikimedia Commons, cropped.",
    "Anders Eidesvik, CC BY-SA 4.0 \u00B7 Steve Jurvetson, CC BY 4.0",
    "Coolcaesar, CC BY-SA 4.0"
  ]
};
