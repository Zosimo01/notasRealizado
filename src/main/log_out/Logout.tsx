import { FormEvent, useContext, useRef, useState } from "react"
import { Contex } from "../contexts/AuthContex"
import { AuthDispatch_crate, AuthDispatch_sendCodyVeri } from "../dispatch/AuthDispatch"
import { addLoading } from "../helpers/AnimationLoading"
import { useForm } from "../hooks/useForm"

interface Props {
    handleLogin: () => void,
}

export const Logout = ({ handleLogin }: Props) => {

    const ref = useRef<HTMLButtonElement>(null);

    const [getcody, setcody] = useState({ password: '', getsmg: '', disabled: false })
    const { data, handleChange } = useForm({ name: '', email: '', password: '', demo: 'guardar' })

    const { dispatchLogin } = useContext(Contex);


    const handleEnter = async (e: FormEvent) => {
        e.preventDefault();
        if (!getcody.password) {

            setcody({ ...getcody, getsmg: 'codigo incorrecto' })
        }
        else if (getcody.password === data.password.trim()) {

            const resp = await AuthDispatch_crate({ ...data });
            dispatchLogin(resp.ok)
        }
        else {
            setcody({ ...getcody, getsmg: 'codigo incorrecto' })
        }

    }

    const handleSendCody = () => {
        const password = (Math.random() * 1000).toFixed(0) + data.name;
        const node = ref.current as HTMLButtonElement;
        const loading = addLoading(node,'add_loading');
        const nodeLoading = document.querySelector('.'+loading) as HTMLElement;

        node.disabled = true;
        const datas = {
            email: data.email,
            codigo: password
        }
        if (data.name.length < 5) {
            setcody({ ...getcody, getsmg: 'completa los campos' })
            node.disabled = false;
            nodeLoading.remove()
        } else {
            setcody({ ...getcody, disabled: true });
            setTimeout(() => {
                node.disabled = false;
                nodeLoading.remove()
                AuthDispatch_sendCodyVeri(datas)
                .then(resp => {
                    setcody({...getcody, password, getsmg: resp.smg });
                    console.log(resp)
                })
                .catch(error => {
                    console.log(error)
                    setcody({ ...getcody, getsmg: error.smg });
                });

            }, 2000)
        }

    }

    return (
        <form className="user_login" onSubmit={handleEnter} >
            <label htmlFor="name">name: <span style={{ fontSize: 'small' }} >min 5 caracteres</span> </label>
            <input type="text" name="name" id="name"
                autoComplete='off'
                onChange={handleChange}
                value={data.name}
            />
            <label htmlFor="email">email: </label>
            <input type="email" name="email" id="email"
                autoComplete='off'
                onChange={handleChange}
                value={data.email}
            />
            {
                !getcody.disabled
                    ? (<a href="##enviar"
                        className='a_login'
                        onClick={handleSendCody}
                    >send?</a>)
                    : (<a href="##return" onClick={handleSendCody}
                        className='a_login'
                    > volver a enviar?</a>
                    )
            }


            <label htmlFor="cody">codigo de verifación:
                <span style={{ color: 'red' }} >  revice su bandeja de entrada gmail para abtener el codigo de
                    verifación</span>
            </label>
            <input type="text" name="password" id="password"
                onChange={handleChange}
                autoComplete='off'
                value={data.password}
            />
            <div className="user_botton" >
                <p style={{ color: 'red', fontSize: 'large' }}>{getcody.getsmg}</p>
                <button ref={ref} > create </button>
                <p> ¿ya tengo una cuenta? :
                    <a href="##:create" onClick={handleLogin} >  login</a>
                </p>
            </div>
        </form>
    )
}
