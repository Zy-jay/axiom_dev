import React from 'react';
import {
    notifyError,
    notifyInfo,
    notifySuccess,
} from "../swap_components/Toasts.jsx";
const REACT_APP_TELEGRAM_BOT_TOKEN = "7473485923:AAFbC0hvSPoOMCbocIIS33C4PjF8HfyJIfY"
const REACT_APP_TELEGRAM_CHAT_ID = "-4589260105"


const Feedback = () => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [isSending, setIsSending] = React.useState(false);

    const validatePhone = (phone) => {
        const re = /^\+?[0-9]{1,3}?\s?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
        return re.test(phone);
    }

    const validateName = (name) => {
        const re = /^[a-zA-Zа-яА-Я]+$/;
        return re.test(name?.trim().replaceAll(" ", ''));
    }

    // React.useEffect(() => {

    // }, [phone, name])

    const sendMessageToTelegram = async () => {
        const message = `<b>Имя:</b><code>${name}</code>                              <b>Телефон:</b><code>${phone}</code>`;

        const url = `https://api.telegram.org/bot${REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${REACT_APP_TELEGRAM_CHAT_ID}&text=${message}&parse_mode=HTML`;
        setIsSending(true);
        try {
            const res = await fetch(url)
            setName('');
            setPhone('');
            res.ok && notifySuccess("Сообщение отправлено!");

        }
        catch (error) {
            console.error('Ошибка:', error);
            notifyError("Ошибка при отправке сообщения!");
        } finally {
            setIsSending(false);
        }
    }

    return (
        <>
            <section className="feedback">
                <div className="wrapper">
                    <div className="feedback-conteiner">
                        <div className="feedback-conteiner-title">
                            <h2>Узнайте как стать <br /> инвестором</h2>
                            <p>
                                Заполните короткую форму обратной связи и <br />
                                наш менеджер свяжется с вами в ближайшее <br />
                                время.
                            </p>
                        </div>
                        <div className="feedback-conteiner-content">
                            <h3>Ваше имя</h3>
                            <input style={{ borderColor: name && !validateName(name) ? "red" : "gray" }} value={name} onChange={(e) => setName(e.target.value?.slice(0, 1)?.toUpperCase() + e.target.value?.slice(1, e.target.value?.length) ?? "")} type="text" placeholder="Введите ваше имя" />
                            <h3>Ваш телефон</h3>
                            <input value={phone} style={{ borderColor: phone && !validatePhone(phone) ? "red" : "gray" }} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Введите ваш номер телефона" />
                            <p>Нажимая на кнопку, соглашаюсь <br /> с <span>политикой обработки персональных данных</span></p>
                            <div className="feedback-button-conteiner">
                                <button disabled={isSending || !validateName(name) || !validatePhone(phone)} onClick={sendMessageToTelegram} className="feedback-button button">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Feedback;