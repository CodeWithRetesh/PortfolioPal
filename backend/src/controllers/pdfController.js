import PDFDocument from "pdfkit";
import supabase from "../config/supabase.js";

export async function exportProjectPDF(
  req,
  res
) {
  try {

    const { data: project, error } =
      await supabase
        .from("ai_projects")
        .select("*")
        .eq("id", req.params.id)
        .single();

    if (error || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const p = project.project_data;

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${p.title}.pdf"`
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .text(p.title);

    doc.moveDown();

    doc
      .fontSize(14)
      .text("Abstract");

    doc
      .fontSize(12)
      .text(p.abstract || "");

    doc.moveDown();

    doc
      .fontSize(14)
      .text("Problem Statement");

    doc
      .fontSize(12)
      .text(p.problemStatement || "");

    doc.moveDown();

    doc
      .fontSize(14)
      .text("Objectives");

    p.objectives?.forEach((item) => {
      doc.text(`• ${item}`);
    });

    doc.moveDown();

    doc
      .fontSize(14)
      .text("Features");

    p.features?.forEach((item) => {
      doc.text(`• ${item}`);
    });

    doc.moveDown();

    doc
      .fontSize(14)
      .text("Conclusion");

    doc
      .fontSize(12)
      .text(p.conclusion || "");

    doc.end();

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}