import ProjectFilters from '@/components/ProjectFilters';
import ProjectList from '@/components/ProjectList';

export default function Projects({ searchParams }) {
  const q = {
    title: searchParams.title || '',
    sort: searchParams.sort || 'sort_order,ASC',
    tag: searchParams.tag || ''
  }

  return (
    <main>
      <ProjectFilters />
      <ProjectList q={q} />
    </main >
  )
}
