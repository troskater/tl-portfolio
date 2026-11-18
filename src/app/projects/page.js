import ProjectFilters from '@/components/ProjectFilters';
import ProjectList from '@/components/ProjectList';

export default async function Projects({ searchParams }) {
  const sp = await searchParams

  // a repeated param (?tag=a&tag=b) arrives as an array, use the first value
  const one = (v) => (Array.isArray(v) ? v[0] : v) || ''

  const q = {
    title: one(sp.title),
    sort: one(sp.sort),
    tag: one(sp.tag)
  }

  return (
    <main>
      <ProjectFilters />
      <ProjectList q={q} />
    </main >
  )
}
