console.log("script loaded");

var stud_name = "";
var year_level = "";

const canvas = document.getElementById('dp_frame');
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const moveMagnitude = 8;
const zoomMagnitude = 1.05;

const imgFrameSrc = [
    "./src/images/frames/first_year.png",
    "./src/images/frames/second_year.png",
    "./src/images/frames/third_year.png",
    "./src/images/frames/fourth_year.png",
    "./src/images/frames/faup.png"
];

const images = {
    frame: new Image(),
    photo: new Image()
};

const photoPos = {
    x: 0,
    y: 0,
    scale: 1
}

const adjustImageBtns = {
    up: document.querySelector("[name='image_up']"),
    down: document.querySelector("[name='image_down']"),
    left: document.querySelector("[name='image_left']"),
    right: document.querySelector("[name='image_right']"),
    zoomIn: document.querySelector("[name='image_zoomin']"),
    zoomOut: document.querySelector("[name='image_zoomout']"),
    reset: document.querySelector("[name='image_reset']")
};

window.onload = function() {
    detectIfMessenger();

    $('#get_started_btn').on("click", showDPCreation);
    $('#circular').on("change", checkCircular);
    $('#upload_btn').on("click", bindImgInput);
    $('#photo_upload').on("change", imgUploadHandler);
    $('#download_btn').on("click", imgDownloadHandler);
    $('#copy_btn').on("click", copyCaption);
    $('#change_btn').on("click", changeInputs);

    adjustImageBtns.up.addEventListener("click", () => moveImage(0, -moveMagnitude));
    adjustImageBtns.down.addEventListener("click", () => moveImage(0, moveMagnitude));
    adjustImageBtns.left.addEventListener("click", () => moveImage(-moveMagnitude, 0));
    adjustImageBtns.right.addEventListener("click", () => moveImage(moveMagnitude, 0));

    adjustImageBtns.zoomIn.addEventListener("click", () => zoomImage(zoomMagnitude));
    adjustImageBtns.zoomOut.addEventListener("click", () => zoomImage(1/zoomMagnitude));

    adjustImageBtns.reset.addEventListener("click", () => resetImagePos());
};

function detectIfMessenger() {
    const ua = navigator.userAgent.toLowerCase();
    const isMessenger = ua.includes("fban") || ua.includes("fbav");

    if (isMessenger) {
        document.getElementById("opened_messenger").classList.remove("hidden");
        return;
    }
}

function bindImgInput() {
    $('#photo_upload').click();
}

function showDPCreation() {
    stud_name = document.getElementById('name').value.trim();
    year_level = document.getElementById('year').value;

    if (stud_name === "") {
        alert("Please enter your name!");
        return;
    }

    // Hide the welcome_banner section
    document.getElementById('welcome_banner').classList.add("hidden");

    // Show the dp_frame_creation section
    document.getElementById('dp_frame_creation').classList.remove("hidden");

    // Update Welcome Message and Caption
    const welcomeMsg = document.getElementById('welcome');
    welcomeMsg.innerHTML = `Welcome aboard, ${stud_name}! Rocking that (${year_level}) KOMSAI spirit!`;

    const caption = document.getElementById('caption');
    caption.innerText = getCaptionTemplate();

    loadDPFrameImg();
}

function checkCircular() {
    const isChecked = document.getElementById('circular').checked;

    if (isChecked) {
        canvas.classList.remove("rounded-md");
        canvas.classList.add("rounded-full");
    } else {
        canvas.classList.remove("rounded-full");
        canvas.classList.add("rounded-md");
    }
}

function loadDPFrameImg() {
    if (year_level === "") {
        alert("Please select your year level.")
        return;
    }

    let frameSrc = '';

    switch(year_level) {
        case "1st Year": frameSrc = imgFrameSrc[0]; break;
        case "2nd Year": frameSrc = imgFrameSrc[1]; break;
        case "3rd Year": frameSrc = imgFrameSrc[2]; break;
        case "4th Year": frameSrc = imgFrameSrc[3]; break;
        case "FAUP": frameSrc = imgFrameSrc[4]; break;
        default:
            alert("Unrecognized year Level.");
            return;
    }

    images.frame.src = frameSrc;
    images.frame.onload = () => {
        drawDPFrame();
    }
}

function drawDPFrame() {
    // Clear canvas before drawing
    context.clearRect(0, 0, width, height);

    if (images.photo.src) {
        const imgW = images.photo.width;
        const imgH = images.photo.height;

        // Scale image to retain its aspect ratio based on canvas size
        const baseScale = Math.min(width / imgW, height / imgH);
        const scaledW = imgW * baseScale * photoPos.scale;
        const scaledH = imgH * baseScale * photoPos.scale;
        const offsetX = (width - scaledW) / 2 + photoPos.x;
        const offsetY = (width - scaledH) / 2 + photoPos.y;

        context.drawImage(images.photo, offsetX, offsetY, scaledW, scaledH);
    }

    if (images.frame.src) {
        context.drawImage(images.frame, 0, 0, width, height);
    }
}

function imgUploadHandler(e) {
    const file = e.target.files[0];

    if (!file) {
        alert("Please select an image");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        images.photo.onload = () => {
            drawDPFrame();

            document.getElementById('download_btn').disabled = false;
            adjustImageBtns.up.disabled = false;
            adjustImageBtns.down.disabled = false;
            adjustImageBtns.left.disabled = false;
            adjustImageBtns.right.disabled = false;
            adjustImageBtns.zoomIn.disabled = false;
            adjustImageBtns.zoomOut.disabled = false;
            adjustImageBtns.reset.disabled = false;
        };
        images.photo.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

function imgDownloadHandler() {
    const link = document.createElement('a');
    link.download = `${stud_name}_DP_Frame_${year_level}_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");;
    link.click();

    dwnldStatus = document.getElementById('download_status');
    dwnldStatus.innerHTML = `<i class="fa-solid fa-circle-check text-green-600"></i> DP Frame Download Started!`;
    dwnldStatus.classList.remove("hidden");

    setTimeout(() => {
        dwnldStatus.classList.add("hidden");
    }, 3000); 
}

function moveImage(xOffSet, yOffSet) {
    photoPos.x += xOffSet;
    photoPos.y += yOffSet;

    drawDPFrame();
} 

function zoomImage(scaleFactor) {
    const minScale = 0.5;
    const maxScale = 3.0;

    photoPos.scale *= scaleFactor;

    if (photoPos.scale < minScale) {
        photoPos.scale = minScale;
    } else if (photoPos.scale > maxScale) {
        photoPos.scale = maxScale;
    }

    drawDPFrame();
}

function resetImagePos() {
    photoPos.x = 0;
    photoPos.y = 0;
    photoPos.scale = 1;

    drawDPFrame();
}

function getCaptionTemplate() {
    return `
“I didn’t choose the grind — the grind chose me.” 💔⛏️
But hey, might as well make it legendary.

Hi! I’m ${stud_name}, a proud ${year_level} BS Computer Science student from UP Tacloban 💻✨
This year, we’re not just coding — we’re crafting our future, one block at a time.
Join us as we touch grass (and maybe a few creepers) 🌱💥,
explore the mysterious biomes of academic life 🧭📚,
and unlock the hidden enchantments of AY 2025-2026 ⛏️🗡️

So gear up, equip your diamond armor, and let's conquer this school year together.
See you in the overworld (and maybe in the finals boss fight)! 🛡️🔥

#UPTacloban
#AY2526
#KOMSAI
`.trim();
}

function copyCaption() {
    cpyStatus = document.getElementById('copy_status');
    navigator.clipboard.writeText(getCaptionTemplate())
    .then(() => {
        cpyStatus.innerHTML = `<i class="fa-solid fa-circle-check text-green-600"></i> Caption Copied Successfully!`;
        cpyStatus.classList.remove("hidden");
    })
    .catch(err => {
        console.error("Clipboard copy failed:", err);
        cpyStatus.innerHTML = `<i class="fa-solid fa-circle-check text-red-600"></i> Cannot copy the caption. Manually copy it from the text field`;
        cpyStatus.classList.remove("hidden");
    });

    setTimeout(() => {
        cpyStatus.classList.add("hidden");
    }, 3000);
}

function changeInputs() {
    // Hide the dp_frame_creation section
    document.getElementById('dp_frame_creation').classList.add("hidden");

    // Show the welcome_banner section
    document.getElementById('welcome_banner').classList.remove("hidden");
}