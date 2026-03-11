import fs from "fs";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

const OUTPUT = "ultimate_docx_test_file.docx";

async function build() {

  const doc = new Document({
    creator: "AutoGenerator",
    title: "Ultimate DOCX Feature Test",
    sections: [
      {
        children: [
          new Paragraph({
            text: "Ultimate DOCX Feature Test",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
          }),

          new Paragraph({
            text: "Generated automatically by GitHub Actions",
          }),

          new Paragraph({
            text: "",
          }),
        ],
      },
    ],
  });

  // 여러 섹션 생성
  for (let i = 1; i <= 30; i++) {

    doc.addSection({
      children: [

        new Paragraph({
          text: `Section ${i}: Feature showcase`,
          heading: HeadingLevel.HEADING_2,
        }),

        new Paragraph({
          children: [
            new TextRun({ text: "Bold", bold: true }),
            new TextRun({ text: " • Italic", italics: true }),
            new TextRun({ text: " • Underline", underline: {} }),
            new TextRun({ text: " • Colored", color: "990033" }),
          ],
          alignment: AlignmentType.JUSTIFIED,
        }),

        new Paragraph({
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(6),
        }),

      ],
    });

  }

  const buffer = await Packer.toBuffer(doc);

  fs.writeFileSync(OUTPUT, buffer);

  console.log("Saved:", OUTPUT, "size:", buffer.length);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});