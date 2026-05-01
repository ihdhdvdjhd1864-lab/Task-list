let but = document.querySelector("button");
let inb = document.querySelector("input");
let ul = document.querySelector("ul");

but.addEventListener("click", function () {
  if (inb.value.trim() !== "") {
    // النص المهام
    let li = document.createElement("li");
    let span = document.createElement("span");
    li.appendChild(span);
    ul.appendChild(li);
    span.textContent = inb.value;
    inb.value = "";

    // مكتمل المهام
    let complete = document.createElement("button");
    complete.textContent = "✓";
    complete.classList.add("complete");
    li.appendChild(complete);

    // حذف المهام
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("deleteBtn");
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
      li.remove();
    });

    complete.addEventListener("click", function () {
      span.classList.toggle("completed");
    });
  } else {
    alert("اكتب مهمة الأول! 📝");
  }
});

// ✅ إضافة Enter key support
inb.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    but.click();
  }
});