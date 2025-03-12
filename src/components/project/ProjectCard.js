import styles from './ProjectCard.module.css'

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span> R$ {budget}
      </p>
      <p className={styles.category_text}>
        <span></span> {category}
      </p>
    </div>
  )
}

export default ProjectCard
