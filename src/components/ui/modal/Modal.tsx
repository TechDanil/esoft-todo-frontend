import type { MouseEventHandler } from 'react'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { MODAL_CONTAINER_ID } from '../../../configs/index.config'
import { createContainer } from '../../../utils/createContainer/createContainer'
import Portal from '../../shared/portal/Portal'

interface IModalProps {
	children: ReactNode
	handleModalClose?: () => void
}

const Modal = ({ children, handleModalClose }: IModalProps) => {
	const [isMounted, setMounted] = useState(false)

	const rootRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID })
		setMounted(true)
	}, [])

	useEffect(() => {
		const onWrapperClickHandler = (event: MouseEvent) => {
			const { target } = event

			if (target instanceof Node && rootRef.current === target) {
				handleModalClose?.()
			}
		}

		const onEscapePressHandler = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleModalClose?.()
			}
		}

		window.addEventListener('click', onWrapperClickHandler)
		window.addEventListener('keydown', onEscapePressHandler)

		return () => {
			window.removeEventListener('click', onWrapperClickHandler)
			window.removeEventListener('keydown', onEscapePressHandler)
		}
	}, [handleModalClose])

	const onCloseHandler: MouseEventHandler<HTMLButtonElement> =
		useCallback(() => {
			handleModalClose?.()
		}, [handleModalClose])

	return isMounted ? (
		<Portal id={MODAL_CONTAINER_ID}>
			<div
				ref={rootRef}
				className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'
			>
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<button
						onClick={onCloseHandler}
						className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
					>
						Close
					</button>
					{children}
				</div>
			</div>
		</Portal>
	) : null
}

export default Modal
