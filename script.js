let but = document.querySelector(".but");
let inb = document.querySelector(".input");
let ul = document.querySelector("ul");

// 1. دالة حفظ البيانات في المتصفح
function saveData() {
    localStorage.setItem("myTodoList", ul.innerHTML);
}

// 2. دالة عرض البيانات عند فتح الصفحة
function showData() {
    let savedTasks = localStorage.getItem("myTodoList");
    if (savedTasks) {
        ul.innerHTML = savedTasks;
        attachEvents(); // إعادة تشغيل الزراير للمهام اللي رجعت
    }
}

// 3. دالة ربط الأوامر بالزراير (عشان لما تعمل Refresh الزراير تشتغل)
function attachEvents() {
    let allItems = ul.querySelectorAll("li");
    
    allItems.forEach((li) => {
        let span = li.querySelector("span");
        let completeBtn = li.querySelector(".complete");
        let deleteBtn = li.querySelector(".deleteBtn");
        let editBtn = li.querySelector(".buttow");

        // زرار الحذف
        deleteBtn.onclick = function () {
            li.remove();
            saveData();
        };

        // زرار الاكتمال
        completeBtn.onclick = function () {
            span.style.cssText = `
                text-decoration: line-through;
                color: rgb(99, 98, 98);
                font-size: 14px;
                transition: 0.6s;
            `;
            saveData();
        };

        // زرار التعديل (اللي كان مزعلك يا عم!)
        editBtn.onclick = function () {
            let newText = prompt("عدل المهمه!", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText;
                
                // الأسطر اللي طلبتها عشان ترجع الاستايل لأصله
                span.style.textDecoration = "none";
                span.style.color = "black";
                span.style.fontSize = "18px";
                
                saveData(); // حفظ التعديل الجديد
            }
        };
    });
}

// إضافة مهمة جديدة
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

        // زرار الحذف
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "×";
        deleteBtn.classList.add("deleteBtn");
        li.appendChild(deleteBtn);

        // زرار التعديل
        let editBtn = document.createElement("button");
        editBtn.classList.add("buttow");
        editBtn.textContent = "تعديل المهام";
        li.appendChild(editBtn);

        ul.appendChild(li);
        inb.value = "";

        saveData();      // حفظ في LocalStorage
        attachEvents();  // تشغيل الأكشنز على المهمة الجديدة
    } else {
        alert("اكتب مهمة الأول! 📝");
    }
});

// دعم زرار Enter
inb.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        but.click();
    }
});

// تشغيل جلب البيانات أول ما تفتح الصفحة
showData();