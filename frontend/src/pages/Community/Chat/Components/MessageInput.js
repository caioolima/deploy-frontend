import { useState, useEffect } from 'react'; // Certifique-se de importar useState e useEffect

const MessageInput = ({
    unreadMessages,
    lastMessageSeenIndex, 
    messages, 
    handleUnreadMessageClick, 
    messageInput, 
    handleKeyPress, 
    AiOutlineCamera, 
    setShowMediaModal, 
    sendMessage,
    setMessageInput
}) => {
    const [isSending, setIsSending] = useState(false);

    // Habilita ou desabilita o botão "Enviar" com base no valor de messageInput
    const isButtonDisabled = isSending || !messageInput.trim();

    const handleSendMessage = async () => {
        if (!isSending && messageInput.trim()) {
            setIsSending(true);
            try {
                await sendMessage(); // Supondo que sendMessage é uma função assíncrona
            } finally {
                setIsSending(false); // Reativa o botão após o envio
            }
        }
    };

    // Faz o botão ser ativado quando messageInput muda
    useEffect(() => {
        // Aqui o botão será desativado se a mensagem estiver sendo enviada
        // ou se o campo de entrada estiver vazio.
    }, [messageInput, isSending]);

    return (
        <div className="message-input">
            {unreadMessages > 0 && lastMessageSeenIndex !== messages.length - 1 && (
                <p className="unread-messages" onClick={handleUnreadMessageClick}>
                    {unreadMessages} mensagens não lidas
                </p>
            )}

            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress} // Adicione o evento de teclado aqui
                placeholder="Digite sua mensagem"
            />
            {/* Ícone de câmera para abrir o modal */}
            <AiOutlineCamera
                className="camera-icon"
                onClick={() => setShowMediaModal(true)}
            />
            <button 
                onClick={handleSendMessage} 
                disabled={isButtonDisabled} // Desativa o botão com base em isButtonDisabled
                className={`send-button ${isButtonDisabled ? 'disabled' : ''}`}
            >
                Enviar
            </button>
        </div>
    );
}

export default MessageInput;
