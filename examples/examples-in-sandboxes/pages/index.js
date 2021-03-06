// source code link: https://github.com/liuderchi/next.js/tree/play/examples-in-sandboxes/examples/examples-in-sandboxes
import { useState, useEffect } from 'react'

// gh repo content API doc https://developer.github.com/v3/repos/contents/#get-contents
// related dirs https://github.com/zeit/next.js/tree/canary/examples
const API_URL = 'https://api.github.com/repos/zeit/next.js/contents/examples'

const genSandboxUrl = (name) =>
  `https://codesandbox.io/s/github/zeit/next.js/tree/canary/examples/${name}?from-embed`

const DEPRECATED_EXAMPLES = ['page-transitions']

const getLinkStyle = (exampleName) => ({
  textDecoration: DEPRECATED_EXAMPLES.includes(exampleName)
    ? 'line-through underline'
    : 'underline',
})

const mainCSS = `
  li {
    height: 25px;
  }`

export default () => {
  const [examples, setExamples] = useState([])
  useEffect(() => {
    // TODO use gql to avoid over fetch
    fetch(API_URL)
      .then((res) => res.json())
      .then((folders) => {
        setExamples(
          folders.map((folder) => ({
            name: folder.name, // e.g. 'active-class-name'
            csbUrl: genSandboxUrl(folder.name),
            ghUrl: folder.html_url,
          }))
        )
      })
  }, [])

  return (
    <>
      <style jsx>{mainCSS}</style>
      <h1>
        <a
          href="https://github.com/zeit/next.js/tree/canary/examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js Examples
        </a>{' '}
        in CodeSandboxes
      </h1>
      <ol>
        {examples.map((example, index) => (
          <li key={index}>
            <a
              style={getLinkStyle(example.name)}
              href={example.csbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>{example.name}</code>
            </a>{' '}
            <a href={example.ghUrl} target="_blank" rel="noopener noreferrer">
              <code>{`🔗 GitHub Link`}</code>
            </a>
          </li>
        ))}
      </ol>
    </>
  )
}
