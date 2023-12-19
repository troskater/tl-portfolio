'use client'

export default function ProjectForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    // get form data
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    // format data
    formData.year = Number(formData.year)
    formData.enabled = Boolean(formData.enabled)

    // post to api
    const res = await fetch('/api/projects/new', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    // get result
    const result = await res.json();
    console.log(result)
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>Add Project</h3>
      <input name="title" type="text" placeholder="Title" />
      <input name="desc" type="text" placeholder="Desc" />
      <input name="screenshot" type="text" placeholder="Screenshot" />
      <input name="logo" type="text" placeholder="Logo" />
      <input name="year" type="number" placeholder="Year" />
      <input name="enabled" type="hidden" value="true" />
      {/* tags */}

      <button type="submit">Add Project</button>
    </form>
  );
}