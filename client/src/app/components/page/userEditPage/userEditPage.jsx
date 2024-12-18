import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualities,
  getQualitiesLoadingStatus,
} from "../../../store/qualities";
import { getCurrentUserData, updateUser } from "../../../store/users";
import {
  getProfessions,
  getProfessionsLoadingStatus,
} from "../../../store/professions";

const UserEditPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUserData());

  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = qualities.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const [errors, setErrors] = useState({});
  // const getProfessionById = (id) => {
  //   for (const prof in professions) {
  //     const profData = professions[prof];
  //     if (profData._id === id) return profData;
  //   }
  // };
  // const getQualities = (elements) => {
  //   const qualitiesArray = [];
  //   for (const elem of elements) {
  //     for (const quality in qualities) {
  //       if (elem.value === qualities[quality]._id) {
  //         qualitiesArray.push(qualities[quality]);
  //       }
  //     }
  //   }
  //   return qualitiesArray;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(
      updateUser({
        ...data,
        qualities: data.qualities.map((q) => q.value),
      })
    );
  };

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  const transformData = (data) => {
    return getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id,
    }));
  };

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);
  useEffect(() => {
    if (data && isLoading) {
      setLoading(false);
    }
  }, [data]);
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Введите ваше имя",
      },
    },
  };
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  // const handleClick = () => {
  //   history.push(`/users/${data._id}`);
  // };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
    <div className="container mt-5">
      <BackHistoryButton />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {!isLoading && Object.keys(professions).length > 0 ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label="Электронная почта"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Выберите вашу профессию"
                  defaultOption="Choose..."
                  name="profession"
                  options={professionsList}
                  value={data.profession}
                  onChange={handleChange}
                  error={errors.profession}
                />
                <RadioField
                  options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" },
                  ]}
                  value={data.sex}
                  name="sex"
                  onChange={handleChange}
                  label="Выберите ваш пол"
                />
                <MultiSelectField
                  defaultValue={data.qualities}
                  options={qualitiesList}
                  onChange={handleChange}
                  name="qualities"
                  label="Выберите ваши качества"
                />

                <button
                  className="btn btn-primary w-100 mx-auto"
                  type="submit"
                  disabled={!isValid}
                >
                  Обновить
                </button>
              </form>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
