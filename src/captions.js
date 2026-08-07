// --- Captions ---
export const getCaption = (year_level, academic_year, stud_name) => {
    const yearLevelFormatted = year_level.includes('faup') ? year_level.toUpperCase() : year_level.replace('-y', ' Y');
    
    const captions = {
        "2025-2026": `
        I didn’t choose the grind — the grind chose me.” 💔⛏️
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
        `,

        "2026-2027": `
        𝓖𝓸𝓽 𝓶𝔂 𝓥𝓘𝓟 𝓹𝓪𝓼𝓼… 𝓽𝓾𝓻𝓷𝓼 𝓸𝓾𝓽 𝓲𝓽’𝓼 𝓳𝓾𝓼𝓽 𝓶𝔂 𝓼𝓽𝓾𝓭𝓮𝓷𝓽 𝓘𝓓 🎟️😭

        Hi! I’m ${stud_name}, a ${yearLevelFormatted} BS Computer Science student from UP Tacloban👾✨

        Welcome to the biggest lineup of the year, featuring coding marathons, surprise quizzes, caffeine as our official sponsor, and classmates who’ll soon become our favorite concert buddies!🎵

        Join us as we chase deadlines like they’re front-row barricades 🎸, survive the loudest drops of exam week 🎧, and celebrate every successful run like confetti just fell from the sky 🎉

        So put on your festival wristband, keep your laptops charged, and let’s make AY 2026-2027 one for the history books 📚

        𝓢𝓮𝓮 𝔂𝓸𝓾 𝓪𝓽 𝓽𝓱𝓮 𝓶𝓪𝓲𝓷 𝓼𝓽𝓪𝓰𝓮! 🤘💙

        #UPTacloban 
        #AY20262027
        #forloopaloza

        Frame by Sinead Colandog and Herielle Margallo
        Caption by Lorenz Ed Ocampo
        `
    }

    return captions[academic_year];
}