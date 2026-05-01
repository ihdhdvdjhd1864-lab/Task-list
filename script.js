let but = document.querySelector(".but");
let inb = document.querySelector(".input");
let ul = document.querySelector("ul");

// 1. دالة لحفظ البيانات في المتصفح
function saveData() {
    localStorage.setItem("tasks", ul.innerHTML);
}

// 2. دالة لجلب البيانات عند فتح الصفحة
function showData() {
    ul.innerHTML = localStorage.getItem("tasks");
    
    // بعد ما نرجع الكود، لازم نرجع "نشغل" الزراير تاني لأنها رجعت كـ نص فقط
    attachEvents();
}

// 3. دالة لإعادة ربط الأحداث (الأزرار) بالوظائف بتاعتها
function attachEvents() {
    let listItems = ul.querySelectorAll("li");
    listItems.forEach(li => {
        let span = li.querySelector("span");
        let completeBtn = li.querySelector(".complete");
        let deleteBtn = li.querySelector(".deleteBtn");
        let editBtn = li.querySelector(".buttow");

        deleteBtn.onclick = function() {
            li.remove();
            saveData(); // حفظ بعد المسح
        };

        completeBtn.onclick = function() {
            span.style.cssText = `
                text-decoration: line-through;
                color: rgb(99, 98, 98);
                font-size: 14px;
                transition: 0.6s;
            `;
            saveData(); // حفظ بعد الاكتمال
        };

        editBtn.onclick = function() {
            let newText = prompt("عدل المهمه!", span.textContent);
            if (newText && newText.trim() !== "") {
                span.textContent = newText;
                saveData(); // حفظ بعد التعديل
            }
        };
    });
}

but.addEventListener("click", function () {
    if (inb.value.trim() !== "") {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = inb.value;
        li.appendChild(span);

        // زرار مكتمل
        let complete = document.createElement("button");
        complete.textContent = "✓";
        complete.classList.add("complete");
        li.appendChild(complete);

        // زرار حذف
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("deleteBtn");
        li.appendChild(deleteBtn);

        // زرار تعديل
        let editBtn = document.createElement("button");
        editBtn.classList.add("buttow");
        editBtn.textContent = "تعديل";
        li.appendChild(editBtn);

        ul.appendChild(li);
        inb.value = "";
        
        saveData(); // حفظ البيانات الجديدة
        attachEvents(); // تشغيل الزراير للمهمة الجديدة
    } else {
        alert("اكتب مهمة الأول! 📝");
    }
});

inb.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        but.click();
    }
});

// تشغيل جلب البيانات أول ما الصفحة تفتح
showData();