import ProjectFilters from '@/components/ProjectFilters';
import ProjectList from '@/components/ProjectList';

export default async function Projects({ searchParams }) {
  const sp = await searchParams

  const q = {
    title: sp.title || '',
    sort: sp.sort || 'sort_order,ASC',
    tag: sp.tag || ''
  }

  return (
    <main>
      <ProjectFilters />
      <ProjectList q={q} />
    </main >
  )
}
