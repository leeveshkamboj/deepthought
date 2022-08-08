function addCard(title, content, type) {
  var element = document.createElement("div");

  element.classList.add("card");

  var elementHead = document.createElement("div");
  elementHead.appendChild(document.createTextNode(title));

  elementHead.classList.add("heading");

  var elementContent = document.createElement("div");
  if (type === "text") {
    elementContent.appendChild(document.createTextNode(content));
  } else if (type === "doc") {
    var frame = document.createElement("iframe");
    frame.src = content;
    frame.height = "500px";
    frame.width = "98%";
    elementContent.appendChild(frame);
  } else if (type === "url") {
    var frame = document.createElement("iframe");
    frame.src = content;
    frame.width = "98%";
    elementContent.appendChild(frame);
  } else if (type === "img") {
    var img = document.createElement("img");
    img.src = content;
    img.style.width = "100%";
    img.style.height = "75%";
    elementContent.appendChild(img);
  } else if (type === "tb") {
    var tb = document.createElement("textarea");
    tb.style.width = "100%";
    tb.style.height = "200px";
    tb.style.borderRadius = "10px";
    elementContent.appendChild(tb);
  } else if (type === "reflection") {
    var tb = document.createElement("input");
    tb.style.width = "100%";
    tb.style.borderRadius = "10px";
    elementContent.appendChild(tb);
  }
  elementContent.classList.add("content");

  element.appendChild(elementHead);
  element.appendChild(elementContent);

  var container = document.getElementById("container");
  container.appendChild(element);
}

var containerHeading = document.getElementById("containerHeading");
containerHeading.textContent = obj.title;

var taskHead = document.getElementById("taskHeading");
taskHead.textContent = obj.tasks[0].task_title;

var sidebarContent = document.getElementById("sidebarContent");
var taskList = document.createElement("ul");
taskList.classList.add("task-list");
obj.tasks.forEach((el) => {
  var taskTitle = document.createElement("li");
  var titleHr = document.createElement("hr");
  taskTitle.appendChild(document.createTextNode(el.task_title));
  taskTitle.appendChild(titleHr)
  taskList.appendChild(taskTitle);
  var assertList = document.createElement("ul");
  assertList.classList.add("assert-list");
  el.assets.forEach((assert, i) => {
    var assertTitle = document.createElement("li");
    assertTitle.appendChild(document.createTextNode(assert.asset_title));
    assertList.appendChild(assertTitle);
    if (i+1 !== el.assets.length){
        var assertHr = document.createElement("hr");
        assertList.appendChild(assertHr)
    }
  });
  taskTitle.appendChild(assertList);
});

sidebarContent.appendChild(taskList);

obj.tasks[0].assets.forEach((el) => {
  if (el.asset_type === "display_asset") {
    if (el.display_asset_docs.length !== 0) {
      addCard(el.asset_title, el.display_asset_docs, "doc");
    } else if (el.display_asset_url.length !== 0) {
      addCard(el.asset_title, el.display_asset_url, "url");
    } else if (el.display_asset_image.length !== 0) {
      addCard(el.asset_title, el.display_asset_image, "img");
    } else if (el.display_asset_video.length !== 0) {
      addCard(el.asset_title, el.display_asset_video, "doc");
    } else {
      addCard(el.asset_title, el.display_asset_reflection, "text");
    }
  } else if (el.asset_type === "input_asset") {
    if (el.asset_content === "tb") {
      addCard(el.asset_title, "", "tb");
    } else if (el.asset_content === "reflection") {
      addCard(el.asset_title, "", "reflection");
    }
  }
});

document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});
