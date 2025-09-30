import React from 'react'

const LanguagePopup = () => {
    return (
        <div className="ms_lang_popup">
            <div id="lang_modal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog">
                    {/* Modal content*/}
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal">
                            <i className="fa_icon form_close"/>
                        </button>
                        <div className="modal-body">
                            <h1>انتخاب زبان</h1>
                            <p>لطفا زبان مورد نظر موسیقی را انتخاب کنید.</p>
                            <ul className="lang_list">
                                <li>
                                    <label className="lang_check_label">
                                        انگلیسی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        هندی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        روسی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        فرانسوی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        آلمانی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        اسپانیایی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        چینی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        ژاپنی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        عربی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                                <li>
                                    <label className="lang_check_label">
                                        ایتالیایی
                                        <input type="checkbox" name="check"/>
                                        <span className="label-text"/>
                                    </label>
                                </li>
                            </ul>
                            <div className="ms_lang_btn">
                                <a href="#" className="ms_btn">
                                    تایید
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default LanguagePopup
