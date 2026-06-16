import supabase from "../config/supabase.js";

// Create a new portfolio:
export const createPortfolio = async (req, res) => {
  try {
    const { title, description, github_url, live_url, tech_stack } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const { data, error } = await supabase
      .from("portfolios")
      .insert([
        {
          user_id: req.user.id,
          title,
          description,
          github_url,
          live_url,
          tech_stack,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyPortfolios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      portfolios: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a portfolio:
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      github_url,
      live_url,
      tech_stack,
    } = req.body;

    // Check ownership
    const { data: existingPortfolio } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (!existingPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found or unauthorized",
      });
    }

    const { data, error } = await supabase
      .from("portfolios")
      .update({
        title,
        description,
        github_url,
        live_url,
        tech_stack,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio: data,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a portfolio:
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    // Check ownership
    const { data: existingPortfolio } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (!existingPortfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found or unauthorized",
      });
    }

    const { error } = await supabase
      .from("portfolios")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};