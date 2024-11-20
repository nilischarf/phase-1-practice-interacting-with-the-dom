document.addEventListener("DOMContentLoaded", () => {
    let counter = 0
    let isPaused = false
    let intervalId
    const likes = {}

    const counterDisplay = document.getElementById("counter")
    const minusButton = document.getElementById("minus")
    const plusButton = document.getElementById("plus")
    const heartButton = document.getElementById("heart")
    const pauseButton = document.getElementById("pause")
    const likesList = document.querySelector(".likes")
    const commentForm = document.getElementById("comment-form")
    const commentInput = document.getElementById("comment-input")
    const commentList = document.getElementById("list")

    const updateCounterDisplay = () => {
        counterDisplay.textContent = counter
    }

    const startTimer = () => {
        intervalId = setInterval(() => {
            counter++
            updateCounterDisplay()
        }, 1000)
    }

    const togglePause = () => {
        isPaused = !isPaused
        if (isPaused) {
            clearInterval(intervalId)
            minusButton.disabled = true
            plusButton.disabled = true
            heartButton.disabled = true
            pauseButton.textContent = "Resume"
        } else {
            startTimer()
            minusButton.disabled = false
            plusButton.disabled = false
            heartButton.disabled = false
            pauseButton.textContent = "Pause"
        }
    }

    const addLike = () => {
        if (!likes[counter]) {
            likes[counter] = 0
        }
        likes[counter]++
        const existingLike = document.querySelector(`[data-counter="${counter}"]`)
        if (existingLike) {
            existingLike.textContent = `${counter} has been liked ${likes[counter]} time(s).`
        } else {
            const li = document.createElement("li")
            li.setAttribute("data-counter", counter)
            li.textContent = `${counter} has been liked ${likes[counter]} time(s).`;
            likesList.appendChild(li)
        }
    }

    const submitComment = (event) => {
        event.preventDefault()
        const comment = commentInput.value.trim()
        if (comment) {
            const p = document.createElement("p")
            p.textContent = comment
            commentList.appendChild(p)
            commentInput.value = ""
        }
    }

    plusButton.addEventListener("click", () => {
        counter++
        updateCounterDisplay()
    })

    minusButton.addEventListener("click", () => {
        counter--
        updateCounterDisplay()
    })

    heartButton.addEventListener("click", addLike)

    pauseButton.addEventListener("click", togglePause)

    commentForm.addEventListener("submit", submitComment)

    updateCounterDisplay()
    startTimer()
})