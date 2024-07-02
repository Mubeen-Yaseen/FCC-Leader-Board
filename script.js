const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";



const latestinfo = document.getElementById('latest-info')

const allCategories = {
    299: { category: "Career Advice", className: "career" },
    409: { category: "Project Feedback", className: "feedback" },
    417: { category: "freeCodeCamp Support", className: "support" },
    421: { category: "JavaScript", className: "javascript" },
    423: { category: "HTML - CSS", className: "html-css" },
    424: { category: "Python", className: "python" },
    432: { category: "You Can Do This!", className: "motivation" },
    560: { category: "Backend Development", className: "backend" },
};

const showcategory = (id) => {
    let showcategorybtn = {}
    if (allCategories.hasOwnProperty(id)) {
        const { category, className } = allCategories[id]
        showcategorybtn.className = className;
        showcategorybtn.category = category;
    }
    else {
        showcategorybtn.className = 'general';
        showcategorybtn.category = 'General'
        showcategorybtn.id = 1
    }
    const text = showcategorybtn.category
    return `<a class="categoryanchor ${showcategorybtn.className}"href="${forumCategoryUrl}${id}" >${text}</a>`
}


const fetchdata = async () => {
    try {
        const FetchApi = await fetch(forumLatest)
        const response = await FetchApi.json()
        dataformation(response)
    }
    catch (err) {
        console.log(err)
    }
}
fetchdata()

const dataformation = (response) => {
    const { topic_list, users } = response
    const { topics } = topic_list
    latestinfo.innerHTML = topics.map((itm) => {
        const {
            id,
            title,
            fancy_title,
            slug,
            views,
            posts_count,
            bumped_at,
            category_id,
            posters,
        } = itm

        return `
   <tr>
   <td>
   ${title}
   ${showcategory(category_id)}
   </td>
   <td>
   <div id="poster-container">
   ${posterrs(posters, users)}
   </div>
   </td>
   <td>${posts_count}</td>
   <td>${viewers(views)}</td>
   <td>${timeago(bumped_at)}</td>
</tr>
   `
    }).join('')
}


const posterrs = (posters, users) => {
    return posters.map((poster) => {
        const userfinds = users.find((user) => user.id === poster.user_id)
        if (userfinds) {
            const avater = userfinds.avatar_template.replace(/{size}/, 35)
            const avaterpic = avater.startsWith("/user_avatar/")
                ? avatarUrl.concat(avater) : avater
            return `<img src="${avaterpic}" alt="${userfinds.username}">`
        }
    }).join('')
}




const viewers = (views) => {
    if (views >= 1000) {
        const thousand = Math.floor(views / 1000)
        return `${thousand}k`
    }
    else {
        return views;
    }
}



const timeago = (bumped_at) => {
    const currenttime = new Date()
    const posttime = new Date(bumped_at)
    const calculatedtime = currenttime - posttime

    const minago = Math.floor(calculatedtime / 1000 / 60)
    const hourago = Math.floor(minago / 60)
    const dayago = Math.floor(hourago / 24)

    if (minago < 60) {
        return `${minago}m ago`
    }
    if (hourago < 24) {
        return `${hourago}h ago`
    }
    else {
        return `${dayago}d ago`
    }
}


