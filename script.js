let but = document.querySelector(".but");
let inb = document.querySelector(".input");
let ul = document.querySelector("ul");
but.addEventListener("click", function () {
  if (inb.value.trim() !== "") {
    // النص المهام
    let li = document.createElement("li");
    let span = document.createElement("span");
    li.appendChild(span);
    ul.appendChild(li);
 
    span.textContent = inb.value 
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
      span.style.cssText = `
      
  text-decoration: line-through;
  color: rgb(99, 98, 98);
  font-size: 14px;

      transition: 0.6s;

      `;
    });
    // زار التعديل
    let buttow = document.createElement("button");
    buttow.classList.add("buttow");
    buttow.textContent = "تعديل المهام";
    li.appendChild(buttow);

    buttow.addEventListener("click", function () {
      let newText = prompt("عدل المهمه!", span.textContent);
      if (newText.trim() !== "") {
        span.textContent = newText;
      }
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
