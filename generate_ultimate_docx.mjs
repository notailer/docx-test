// generate_ultimate_docx.mjs
// Node v18+ (ESM). Requires docx package (workflow will install).
import fs from "fs";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

const OUT = "ultimate_docx_test_file.docx";

async function build() {
  const doc = new Document({
    creator: "AutoGenerator",
    title: "Ultimate DOCX Feature Test",
    sections: [
      {
        children: [
          new Paragraph({ text: "Ultimate DOCX Feature Test", heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
          new Paragraph({ text: "Generated automatically by GitHub Actions" }),
          new Paragraph({ text: "" }),
        ],
      },
    ],
  });

  // Add many sections to increase pages
  for (let i = 1; i <= 30; i++) {
    doc.addSection({
      children: [
        new Paragraph({ text: `Section ${i}: Feature showcase`, heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun("Bold").bold(),
            new TextRun(" • Italic").italics(),
            new TextRun(" • Underline").underline(),
            new TextRun(" • Colored").color("990033"),
          ],
          alignment: AlignmentType.JUSTIFIED,
        }),
        new Paragraph("Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(6)),
      ],
    });
  }

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT, buffer);
  console.log("Saved:", OUT, "size:", buffer.length);
}

build().catch(e => { console.error(e); process.exit(1); });