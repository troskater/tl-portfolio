import ProjectForm from '@/components/ProjectForm'

export default function Test() {
  return (
    <main>
      {process.env.NODE_ENV == "development" ? (<>
        <ProjectForm />
      </>) : <div>Not allowed.</div>}
    </main>
  )
}
