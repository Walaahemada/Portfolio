const supabaseUrl = "https://kmqpodvczqdfcpqihjyg.supabase.co";
const supabaseKey = "sb_publishable_dpxT263d0jphkoqGxlNe-g_cSv69wnd";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const { error } = await supabaseClient
    .from("messages")
    .insert([
      {
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        mobile: formData.get("mobile"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      },
    ]);

  if (error) {
    console.error(error);
    alert("❌ Error");
  } else {
    alert("✅ Sent");
    form.reset();
  }
});
