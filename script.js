document.addEventListener("DOMContentLoaded", () => {
    // Get form elements
    const form = document.getElementById("ikigaiForm")
    const saveBtn = document.getElementById("saveBtn")
    const loadBtn = document.getElementById("loadBtn")
    const printBtn = document.getElementById("printBtn")
    const saveMessage = document.getElementById("saveMessage")
  
    // Copy tags to action table
    const tag1 = document.getElementById("tag1")
    const tag2 = document.getElementById("tag2")
    const tag3 = document.getElementById("tag3")
    const tagAction1 = document.getElementById("tagAction1")
    const tagAction2 = document.getElementById("tagAction2")
    const tagAction3 = document.getElementById("tagAction3")
  
    // Update tag actions when tags change
    tag1.addEventListener("input", function () {
      tagAction1.value = this.value
    })
  
    tag2.addEventListener("input", function () {
      tagAction2.value = this.value
    })
  
    tag3.addEventListener("input", function () {
      tagAction3.value = this.value
    })
  
    // Populate causes table
    function populateCausesTable() {
      const causesTableBody = document.getElementById("causesTableBody")
      causesTableBody.innerHTML = ""
  
      for (let i = 1; i <= 5; i++) {
        const causeInput = document.getElementById(`cause${i}`)
        if (causeInput && causeInput.value.trim() !== "") {
          const row = document.createElement("tr")
  
          // Cause column
          const causeCell = document.createElement("td")
          causeCell.textContent = causeInput.value
          row.appendChild(causeCell)
  
          // Actions column
          const actionsCell = document.createElement("td")
          const actionsInput = document.createElement("textarea")
          actionsInput.id = `actions${i}`
          actionsInput.name = `actions${i}`
          actionsInput.rows = 3
          actionsCell.appendChild(actionsInput)
          row.appendChild(actionsCell)
  
          // Reading column
          const readingCell = document.createElement("td")
          const readingSelect = document.createElement("select")
          readingSelect.id = `reading${i}`
          readingSelect.name = `reading${i}`
          const options = ["", "Oui", "Non", "Parfois"]
          options.forEach((option) => {
            const optionEl = document.createElement("option")
            optionEl.value = option
            optionEl.textContent = option
            readingSelect.appendChild(optionEl)
          })
          readingCell.appendChild(readingSelect)
          row.appendChild(readingCell)
  
          // News column
          const newsCell = document.createElement("td")
          const newsSelect = document.createElement("select")
          newsSelect.id = `news${i}`
          newsSelect.name = `news${i}`
          options.forEach((option) => {
            const optionEl = document.createElement("option")
            optionEl.value = option
            optionEl.textContent = option
            newsSelect.appendChild(optionEl)
          })
          newsCell.appendChild(newsSelect)
          row.appendChild(newsCell)
  
          // Engagement column
          const engagementCell = document.createElement("td")
          const engagementSelect = document.createElement("select")
          engagementSelect.id = `engagement${i}`
          engagementSelect.name = `engagement${i}`
          options.forEach((option) => {
            const optionEl = document.createElement("option")
            optionEl.value = option
            optionEl.textContent = option
            engagementSelect.appendChild(optionEl)
          })
          engagementCell.appendChild(engagementSelect)
          row.appendChild(engagementCell)
  
          causesTableBody.appendChild(row)
        }
      }
  
      // If no causes were added, add a placeholder row
      if (causesTableBody.children.length === 0) {
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.colSpan = 5
        cell.textContent = "Ajoutez des causes ci-dessus pour remplir ce tableau"
        cell.style.textAlign = "center"
        row.appendChild(cell)
        causesTableBody.appendChild(row)
      }
    }
  
    // Update causes table when causes change
    for (let i = 1; i <= 5; i++) {
      const causeInput = document.getElementById(`cause${i}`)
      causeInput.addEventListener("change", populateCausesTable)
    }
  
    // Initialize causes table
    populateCausesTable()
  
    // Save form data to localStorage
    saveBtn.addEventListener("click", () => {
      const formData = new FormData(form)
      const formDataObj = {}
  
      formData.forEach((value, key) => {
        formDataObj[key] = value
      })
  
      // Add causes table data
      for (let i = 1; i <= 5; i++) {
        const actionsInput = document.getElementById(`actions${i}`)
        const readingSelect = document.getElementById(`reading${i}`)
        const newsSelect = document.getElementById(`news${i}`)
        const engagementSelect = document.getElementById(`engagement${i}`)
  
        if (actionsInput) {
          formDataObj[`actions${i}`] = actionsInput.value
        }
  
        if (readingSelect) {
          formDataObj[`reading${i}`] = readingSelect.value
        }
  
        if (newsSelect) {
          formDataObj[`news${i}`] = newsSelect.value
        }
  
        if (engagementSelect) {
          formDataObj[`engagement${i}`] = engagementSelect.value
        }
      }
  
      localStorage.setItem("ikigaiFormData", JSON.stringify(formDataObj))
  
      // Show save message
      saveMessage.textContent = "Données enregistrées avec succès!"
      saveMessage.classList.add("show")
  
      setTimeout(() => {
        saveMessage.classList.remove("show")
      }, 3000)
    })
  
    // Load form data from localStorage
    loadBtn.addEventListener("click", () => {
      const savedData = localStorage.getItem("ikigaiFormData")
  
      if (savedData) {
        const formDataObj = JSON.parse(savedData)
  
        // Fill form fields
        Object.keys(formDataObj).forEach((key) => {
          const field = form.elements[key]
          if (field) {
            field.value = formDataObj[key]
          }
        })
  
        // Update tag actions
        tagAction1.value = tag1.value
        tagAction2.value = tag2.value
        tagAction3.value = tag3.value
  
        // Rebuild causes table
        populateCausesTable()
  
        // Fill causes table data
        for (let i = 1; i <= 5; i++) {
          const actionsInput = document.getElementById(`actions${i}`)
          const readingSelect = document.getElementById(`reading${i}`)
          const newsSelect = document.getElementById(`news${i}`)
          const engagementSelect = document.getElementById(`engagement${i}`)
  
          if (actionsInput && formDataObj[`actions${i}`]) {
            actionsInput.value = formDataObj[`actions${i}`]
          }
  
          if (readingSelect && formDataObj[`reading${i}`]) {
            readingSelect.value = formDataObj[`reading${i}`]
          }
  
          if (newsSelect && formDataObj[`news${i}`]) {
            newsSelect.value = formDataObj[`news${i}`]
          }
  
          if (engagementSelect && formDataObj[`engagement${i}`]) {
            engagementSelect.value = formDataObj[`engagement${i}`]
          }
        }
  
        // Show save message
        saveMessage.textContent = "Données chargées avec succès!"
        saveMessage.classList.add("show")
  
        setTimeout(() => {
          saveMessage.classList.remove("show")
        }, 3000)
      } else {
        saveMessage.textContent = "Aucune donnée sauvegardée trouvée!"
        saveMessage.classList.add("show")
  
        setTimeout(() => {
          saveMessage.classList.remove("show")
        }, 3000)
      }
    })
  
    // Print form
    printBtn.addEventListener("click", () => {
      window.print()
    })
  })
  
  