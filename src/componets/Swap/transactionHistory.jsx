import right_green_circle from "../../assets/images/images_swap/right_green_circle.png";
import React from 'react';
import ellipse_fore_mobile from "../../assets/images/images_swap/ellipse_fore_mobile.png";


const TransactionHistory = () => {

    return ( 
        <>
            <section id="transactionHistory" className="transactionHistory">
                <div className="wrapper">
                    <div className="transactionHistory-conteiner">
                        <div className="transactionHistory-conteiner-title">
                            <h2>История транзакций</h2>
                            <div className="transactionHistory-conteiner-title-line"></div>
                        </div>
                        <div className="transactionHistory-conteiner-content">
                            <table>
                                <tbody>
                                    <tr className="content-table-title">
                                        <td>Сделка</td>
                                        <td>Сумма</td>
                                        <td>Покупка</td>
                                        <td>Транзакция</td>
                                    </tr>
                                    <tr className="content-table-background">
                                        <td>Сделка</td>
                                        <td>Сумма</td>
                                        <td>Покупка</td>
                                        <td>Транзакция</td>
                                    </tr>
                                    <tr>
                                        <td>Сделка</td>
                                        <td>Сумма</td>
                                        <td>Покупка</td>
                                        <td>Транзакция</td>
                                    </tr>
                                    <tr className="content-table-background">
                                        <td>Сделка</td>
                                        <td>Сумма</td>
                                        <td>Покупка</td>
                                        <td>Транзакция</td>
                                    </tr>
                                    <tr>
                                        <td>Сделка</td>
                                        <td>Сумма</td>
                                        <td>Покупка</td>
                                        <td>Транзакция</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="transactionHistory-conteiner-content-mobile">
                            <div className="conteiner-content-mobile-table conteiner-content-mobile-table-border">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                        </tr>
                                        <tr>
                                            <td>Сумма</td>
                                            <td>Сумма</td>
                                        </tr>
                                        <tr>
                                            <td>Покупка</td>
                                            <td>Покупка</td>
                                        </tr>
                                        <tr>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="conteiner-content-mobile-table conteiner-content-mobile-table-background">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                        </tr>
                                        <tr>
                                            <td>Сумма</td>
                                            <td>Сумма</td>
                                        </tr>
                                        <tr>
                                            <td>Покупка</td>
                                            <td>Покупка</td>
                                        </tr>
                                        <tr>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="conteiner-content-mobile-table conteiner-content-mobile-table-border">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                        </tr>
                                        <tr>
                                            <td>Сумма</td>
                                            <td>Сумма</td>
                                        </tr>
                                        <tr>
                                            <td>Покупка</td>
                                            <td>Покупка</td>
                                        </tr>
                                        <tr>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="conteiner-content-mobile-table conteiner-content-mobile-table-background">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                            <td className="content-mobile-pading-top">Сделка</td>
                                        </tr>
                                        <tr>
                                            <td>Сумма</td>
                                            <td>Сумма</td>
                                        </tr>
                                        <tr>
                                            <td>Покупка</td>
                                            <td>Покупка</td>
                                        </tr>
                                        <tr>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                            <td className="content-mobile-pading-bottom">Транзакция</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TransactionHistory;