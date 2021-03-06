// source code link: https://github.com/liuderchi/next.js/tree/play/examples-in-sandboxes/examples/examples-in-sandboxes

// gh repo content API doc https://developer.github.com/v3/repos/contents/#get-contents
// related dirs https://github.com/vercel/next.js/tree/canary/examples
const API_URL = 'https://api.github.com/repos/vercel/next.js/contents/examples'

const genSandboxUrl = (exampleName) =>
  `https://codesandbox.io/s/github/vercel/next.js/tree/canary/examples/${exampleName}?from-embed`

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

export default ({ examples = [] }) => {
  return (
    <>
      <style jsx>{mainCSS}</style>
      <h1>
        <a
          href="https://github.com/vercel/next.js/tree/canary/examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js Examples
        </a>{' '}
        in CodeSandboxes
      </h1>
      <ol>
        {examples?.map((example, index) => (
          <li key={index}>
            <a
              style={getLinkStyle(example.name)}
              href={example.csbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>{example.name}</code>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href={example.ghUrl} target="_blank" rel="noopener noreferrer">
              <code>{`🔗GitHub Link`}</code>
            </a>
          </li>
        ))}
      </ol>
    </>
  )
}

export async function getStaticProps() {
  const data = await (await fetch(API_URL)).json()
  const examples =
    data?.map((example) => ({
      name: example?.name, // e.g. 'active-class-name'
      csbUrl: genSandboxUrl(example?.name),
      ghUrl: example?.html_url,
    })) || []

  return { props: { examples } }
}
