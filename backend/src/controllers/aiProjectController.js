import supabase from "../config/supabase.js";

export async function saveProject(req, res) {
  try {

    const {
      title,
      domain,
      difficulty,
      content,
    } = req.body;

    const { data, error } =
      await supabase
        .from("ai_projects")
        .insert([
          {
            user_id: req.user.id,
            title,
            domain,
            difficulty,
            project_data: content,
          },
        ])
        .select();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      project: data[0],
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getProjects(
  req,
  res
) {
  try {

    const { data, error } =
      await supabase
        .from("ai_projects")
        .select("*")
        .eq(
          "user_id",
          req.user.id
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {
      throw error;
    }

    return res.json({
      success: true,
      projects: data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getProjectById(req, res) {
  try {
    const { data, error } = await supabase
      .from("ai_projects")
      .select("*")
      .eq("id", req.params.id)
      .eq("user_id", req.user.id)
      .single();

    if (error) {
      throw error;
    }

    return res.json({
      success: true,
      project: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteProject(req, res) {
  try {
    const { error } = await supabase
      .from("ai_projects")
      .delete()
      .eq("id", req.params.id)
      .eq("user_id", req.user.id);

    if (error) {
      throw error;
    }

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}