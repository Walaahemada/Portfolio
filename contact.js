const supabaseUrl = "https://kmqpodvczqdfcpqihjyg.supabase.co";
const supabaseKey = "sb_publishable_dpxT263d0jphkoqGxlNe-g_cSv69wnd";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const form = document.getElementById("contactForm");

// div للرسالة
const msgBox = document.createElement("div");
msgBox.id = "formMessage";
msgBox.style.marginTop = "10px";
form.appendChild(msgBox);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");

  const full_name = form.querySelector("input[name='full_name']").value.trim();
  const email = form.querySelector("input[name='email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  // ✅ التحقق من الحقول الأساسية
  if (!full_name || !email || !message) {
    msgBox.style.color = "red";
    msgBox.textContent = "❌ Please fill in your name, email, and message.";
    return; // ما يعمل إرسال
  }

  // Disable button أثناء الإرسال
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  msgBox.textContent = ""; // مسح الرسالة القديمة

  const formData = new FormData(form);

  try {
    const { error } = await supabaseClient
      .from("messages")
      .insert([
        {
          full_name: full_name,
          email: email,
          mobile: formData.get("mobile") || "",
          subject: formData.get("subject") || "",
          message: message,
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
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
