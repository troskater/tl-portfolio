import ProjectForm from '@/components/ProjectForm'
import ProjectList from '@/components/ProjectList'

export default function Test() {
  return (
    <main>
      {process.env.NODE_ENV == "development" ? (<>
        <ProjectForm />
        <ProjectList />
      </>) : <div>Test</div>}
    </main>
  )
}
