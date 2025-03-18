
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import styles from './Project.module.css'
import Container from '../layout/Container'

function Project() {

  const { id } = useParams()
  const [project, setProject] = useState({})
  const [showProjectForm, setShowProjectForm] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data)
        })
        .catch((err) => console.log(err))
    }, 300);
  }, [id])

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  const budgetBRL = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(project.budget ?? 0)
  const costBRL = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(project.cost ?? 0)

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>
                Projeto: {project.name}
              </h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar Edição'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Orçamento</span> {budgetBRL}
                  </p>
                  <p>
                    <span>Total Utilizado</span> {costBRL}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>
                    <span>Detalhes do Projeto</span>
                  </p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project