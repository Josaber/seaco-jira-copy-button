;(ls => {
  /* globals chrome */
  'use strict'

  const buttonId = (cardId, type) => `seaco-jira-${type}-${cardId}`

  const createCopyButton = (cardId, type, value) => {
    let a = document.createElement('a')
    a.id = buttonId(cardId, type)
    a.setAttribute('class', 'btn aui-button aui-button-link')
    a.setAttribute('style', 'margin: 0')
    a.value = value
    a.textContent = type
    a.onclick = () => {
      navigator.clipboard
        .writeText(value)
        .then(() => console.info(value))
        .catch(console.error)
    }
    return a
  }

  const traverse = () => {
    let issues = [].slice.apply(document.querySelectorAll('div[id^="card-"]'))
    let format = formatIssueContent
    issues.length === 0 &&
      (issues = [].slice.apply(document.querySelectorAll('.js-issue'))) &&
      (format = formatIssueContentOld)

    issues.map(element => {
      const { id, text, markdown } = format(element)
      if (!document.querySelector(`#${buttonId(id, 'title')}`)) {
        element.after(createCopyButton(id, 'title', text))
        element.after(createCopyButton(id, 'markdown', markdown))
      }
    })
  }

  const formatIssueContent = element => {
    const issueId = element.id.slice(5)
    const issueContent = element.innerText
    const issueTitle = issueContent.substring(0, issueContent.indexOf('\n'))
    const issueLink = `${location.origin}/browse/${issueId}`
    return { id: issueId, text: `${issueId} ${issueTitle}`, markdown: `[${issueId}](${issueLink})` }
  }

  const formatIssueContentOld = element => {
    const issueId = element.getAttribute('data-issue-key')
    const issueTitle = element.firstElementChild.title
    const issueLink = `${location.origin}/browse/${issueId}`
    return { id: issueId, text: `${issueId} ${issueTitle}`, markdown: `[${issueId}](${issueLink})` }
  }

  traverse()
})(localStorage)
