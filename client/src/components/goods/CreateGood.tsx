import { useState, FormEventHandler } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Textarea, Button } from '../'
import { useForm } from '../../hooks/useForm'
import { sendRequest } from '../../utils/sendRequest'
import { useAuth } from '../../utils/UserContext'

interface FormData {
	title: string
	text: string
}
const CreateArticle = () => {
	const { currentUser, fetchUser, fetchingUser } = useAuth()
	const [values, handleChange] = useForm<FormData>({
		title: '',
		text: '',
	})
	const [formSent, setFormSent] = useState(false)

	if (!currentUser) fetchUser()
	if (!currentUser && !fetchingUser) return <Redirect to="/login" />
	if (formSent) window.location.href = '/'

	const articleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()

		try {
			await sendRequest({
				method: 'POST',
				path: '/articles',
				auth: true,
				body: values,
			})

			setFormSent(true)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form onSubmit={articleSubmit}>
			<Input
				type="text"
				name="title"
				onChange={handleChange}
				value={values.title}
				label="Article title"
			/>
			<Textarea
				name="text"
				value={values.text}
				onChange={handleChange}
				label="Text"
			/>
			<Button text="Create Article" type="submit" />
		</Form>
	)
}

export default CreateArticle
