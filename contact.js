const supabaseUrl = "https://kmqpodvczqdfcpqihjyg.supabase.co";
const supabaseKey = "sb_publishable_dpxT263d0jphkoqGxlNe-g_cSv69wnd";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const form = document.getElementById("contactForm");

// نضيف div للرسالة داخل الصفحة
const msgBox = document.createElement("div");
msgBox.id = "formMessage";
msgBox.style.marginTop = "10px";
form.appendChild(msgBox);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable button أثناء الإرسال
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  msgBox.textContent = ""; // مسح الرسالة القديمة

  const formData = new FormData(form);

  try {
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
      msgBox.style.color = "red";
      msgBox.textContent = "❌ Something went wrong. Please try again.";
      console.error(error);
    } else {
      msgBox.style.color = "green";
      msgBox.textContent = "✅ Your message has been sent successfully!";
      form.reset();
    }
  } catch (err) {
    msgBox.style.color = "red";
    msgBox.textContent = "❌ Unexpected error occurred!";
    console.error(err);
  } finally {
    // إعادة تفعيل الزر بعد العملية
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});


