import React, { useState, useEffect } from "react";

function Form({ formData, handleOnChange, handleOnSubmit, formError }) {
  const { isim, soyisim, email, password, kosul } = formData;
  return (
    <form onSubmit={handleOnSubmit}>
      <p>
        <>
          <label htmlFor="Name">İsim</label>
          <input type="Text" onChange={handleOnChange} id="isim" value={isim} />
          <p>{formError.isim}</p>

          <label htmlFor="Soyisim">Soyisim</label>
          <input
            type="Text"
            onChange={handleOnChange}
            id="soyisim"
            value={soyisim}
          />
          <p>{formError.soyisim}</p>

          <label htmlFor="şifre">şifre</label>
          <input
            type="password"
            onChange={handleOnChange}
            id="password"
            value={password}
          />
          <p>{formError.password}</p>

          <label htmlFor="email">email</label>
          <input
            type="Text"
            onChange={handleOnChange}
            id="email"
            value={email}
          />
          <p>{formError.email}</p>

          <label htmlFor="kosul">Kullanım Koşulları!</label>
          <input
            type="checkbox"
            onChange={handleOnChange}
            id="kosul"
            name="kosul"
            checked={kosul}
          />
          <p>{formError.kosul}</p>
          <button type="submit">Gönder!</button>
        </>
      </p>
    </form>
  );
}

export default Form;
