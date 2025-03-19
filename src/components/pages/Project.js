
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Message from "../layout/Message"
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import styles from './Project.module.css'

function Project() {

  const { id } = useParams()
  const [project, setProject] = useState({})
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

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

  function editPost(project) {
    // budget validation
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado com sucesso!')
        setType('success')
      })
      .catch((err) => console.log(err))
    setMessage('')
  }

  const budgetBRL = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(project.budget ?? 0)
  const costBRL = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(project.cost ?? 0)

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>
                Projeto: {project.name}
              </h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
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
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Salvar"
                    projectData={project}
                  />
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