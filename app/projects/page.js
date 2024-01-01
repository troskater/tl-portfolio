import ProjectFilters from '@/components/ProjectFilters';
import ProjectList from '@/components/ProjectList';

export default function Projects({ searchParams }) {
  const q = {
    title: searchParams.title || '',
    sortBy: searchParams.sortBy || 'sort_order',
    sort: searchParams.sort || 'ASC',
    tag: searchParams.tag || ''
  }

  return (
    <main>
      <ProjectFilters />
      <ProjectList q={q} />
    </main >
  )
}
