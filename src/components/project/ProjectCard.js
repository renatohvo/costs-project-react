import { Link } from 'react-router-dom'
import { BsFillTrashFill, BsPencil } from 'react-icons/bs'
import styles from './ProjectCard.module.css'

function ProjectCard({ id, name, budget, category, handleRemove }) {

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }

  const budgetBRL = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(budget ?? 0)

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span> {budgetBRL}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Remover
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
