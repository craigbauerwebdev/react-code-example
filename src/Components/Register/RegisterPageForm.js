import LinkWrapper from "Components/LinkWrapper/LinkWrapper";
import OEPAnalytics from "Components/OEPAnalytics";
import React from "react";
import countriesNames from "countries-names";
export default class Form extends React.Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    company: null,
    country: "United States",
    countries: [],
    formResponse: null,
    showForm: true,
    service_agreement: false,
    your_event_updates: false,
    investor: false,
    student: false,
    foundation_leader: false,
    workforce_innovation_executive: false,
    learning_innovation_leader: false,
    start_up_ceo: false,
    start_up_team: false,
    selector: {
      learning: false,
      workforce_talent: false,
      early_childhood: false,
      k12: false,
      accredited: false,
      non_accredited: false,
      pre_k_gray: false,
      ceo: false,
      talent_people: false,
      l_d: false,
      venture: false,
      growth: false,
      private_equity: false,
      graduate_student: false,
      other: null,
    },
  };

  componentDidMount() {
    const countries = [
      "United States",
      ...countriesNames
        .names()
        .filter((country) => country !== "United States"),
    ];
    this.setState({
      countries: countries,
    });
  }

  formStatus = (res) => {
    this.setState({
      formResponse: res,
      showForm: false,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const _this = this;
    const {
      firstName,
      lastName,
      email,
      company,
      country,
      your_event_updates,
      service_agreement,
    } = this.state;
    const timestamp = `${new Date()}`;

    const i_am_role = this.getTruthyOptionValues();
    const i_am_role_type = this.getTruthySelectorValues();

    if (i_am_role && i_am_role_type) {
      fetch(`https://hooks.zapier.com/hooks/catch/456234/o1r8agf/`, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          company,
          country,
          i_am_role,
          i_am_role_type,
          your_event_updates,
          service_agreement,
          timestamp,
        }),
      })
        .then(() => _this.formStatus("sent"))
        .catch(() => _this.formStatus("not sent"));
    }
  };

  handleChange = (e) => {
    const type = e.target.getAttribute("data-type");
    const value = e.target.value;
    const nextState = this.state;
    nextState[type] = value;
    this.setState(nextState);
  };

  setTheRestFalse = (type, value) => {
    if (value === true) {
      const options = [
        "investor",
        "student",
        "foundation_leader",
        "workforce_innovation_executive",
        "learning_innovation_leader",
        "start_up_ceo",
        "start_up_team",
      ];

      const newState = {};

      options.map((option) => {
        return option === type
          ? (newState[option] = true)
          : (newState[option] = false);
      });

      this.setState(newState);
    }
  };

  setTheRestFalseSelectors = (type, value) => {
    if (value === true) {
      const options = [
        "learning",
        "workforce_talent",
        "early_childhood",
        "k12",
        "accredited",
        "non_accredited",
        "pre_k_gray",
        "ceo",
        "talent_people",
        "l_d",
        "venture",
        "growth",
        "private_equity",
        "graduate_student",
      ];

      const newState = {};

      options.map((option) => {
        return option === type
          ? (newState[option] = true)
          : (newState[option] = false);
      });

      this.setState({
        selector: newState,
      });
    }
  };

  handleCheckboxChange = (e) => {
    const type = e.target.getAttribute("data-type");
    const value = e.target.checked;
    const nextState = this.state;
    nextState[type] = value;
    this.setState(nextState);
    this.setTheRestFalse(type, value);
  };

  handleSecondCheckboxChange = (e) => {
    const type = e.target.getAttribute("data-type");
    const value = e.target.checked;
    const nextState = this.state;
    nextState[type] = value;
    this.setState(nextState);
  };

  handleOther = (e) => {
    const value = e.target.value;
    const nextState = this.state.selector;
    nextState.other = value;
    this.setState({
      selector: nextState,
    });
  };

  handleSelectorChange = (e) => {
    const type = e.target.getAttribute("data-type");
    const value = e.target.checked;
    const nextState = this.state.selector;
    nextState[type] = value;
    this.setState({
      selector: nextState,
    });
    this.setTheRestFalseSelectors(type, value);
  };

  getTruthySelectorValues = () => {
    const options = [
      "learning",
      "workforce_talent",
      "early_childhood",
      "k12",
      "accredited",
      "non_accredited",
      "pre_k_gray",
      "ceo",
      "talent_people",
      "l_d",
      "venture",
      "growth",
      "private_equity",
      "graduate_student",
    ];

    const response = options
      .map((data) => {
        return this.state.selector[data] === true ? data : null;
      })
      .filter(Boolean)[0];

    if (response === "learning") {
      return "Learning";
    } else if (response === "workforce_talent") {
      return "Workforce/Talent";
    } else if (response === "early_childhood") {
      return "Early Childhood";
    } else if (response === "k12") {
      return "K12";
    } else if (response === "accredited") {
      return "Post-Secondary: Accredited";
    } else if (response === "non_accredited") {
      return "Post-Secondary: Non-accredited";
    } else if (response === "pre_k_gray") {
      return '"PreK-Gray" Multi Sector';
    } else if (response === "ceo") {
      return "CEO";
    } else if (response === "talent_people") {
      return "Talent/People";
    } else if (response === "l_d") {
      return "L & D";
    } else if (response === "venture") {
      return "Venture";
    } else if (response === "growth") {
      return "Growth";
    } else if (response === "private_equity") {
      return "Private Equity";
    } else if (response === "graduate_student") {
      return "Graduate Student";
    } else {
      return response;
    }
  };

  getTruthyOptionValues = () => {
    const options = [
      "investor",
      "student",
      "foundation_leader",
      "workforce_innovation_executive",
      "learning_innovation_leader",
      "start_up_ceo",
      "start_up_team",
    ];

    const response = options
      .map((data) => {
        return this.state[data] === true ? data : null;
      })
      .filter(Boolean)[0];

    if (response === "investor") {
      return "Investor";
    } else if (response === "student") {
      return "Student";
    } else if (response === "foundation_leader") {
      return "Foundation/Philanthropic Leader";
    } else if (response === "workforce_innovation_executive") {
      return "Workforce Innovation Executive";
    } else if (response === "learning_innovation_leader") {
      return "Learning Innovation Leader";
    } else if (response === "start_up_ceo") {
      return "Start Up/Scale Up CEO/Founder";
    } else if (response === "start_up_team") {
      return "Start Up/Scale Up Team";
    } else {
      return response;
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      company,
      country,
      countries,
      showForm,
      formResponse,
      service_agreement,
      your_event_updates,
      investor,
      student,
      foundation_leader,
      workforce_innovation_executive,
      learning_innovation_leader,
      start_up_ceo,
      start_up_team,
      selector,
    } = this.state;

    return (
      <div className="registerpage-form">
        {showForm && (
          <form onSubmit={this.submit}>
            <h2 className="registerpage-title">
              Register for Your Event LIVE!
            </h2>
            <p>Please fill out all fields.</p>
            <section className="input-form">
              <div>
                <label className="registerpage-form-label" htmlFor="firstName">
                  first name *
                </label>
                <input
                  id="firstName"
                  data-type="firstName"
                  required
                  onChange={this.handleChange}
                  value={firstName || ""}
                  className="w-placeholder"
                />
              </div>
              <div>
                <label className="registerpage-form-label" htmlFor="lastName">
                  last name *
                </label>
                <input
                  id="lastName"
                  data-type="lastName"
                  required
                  onChange={this.handleChange}
                  value={lastName || ""}
                  className="w-placeholder"
                />
              </div>
              <div>
                <label className="registerpage-form-label" htmlFor="email">
                  email *
                </label>
                <input
                  id="email"
                  data-type="email"
                  required
                  onChange={this.handleChange}
                  value={email || ""}
                  className="w-placeholder"
                />
              </div>
              <div>
                <label className="registerpage-form-label" htmlFor="company">
                  company *
                </label>
                <input
                  id="company"
                  data-type="company"
                  required
                  onChange={this.handleChange}
                  value={company || ""}
                  className="w-placeholder"
                />
              </div>
              <div>
                <label
                  className="registerpage-form-label"
                  htmlFor="country"
                  data-type="country"
                >
                  country *
                </label>
                <select
                  id="country"
                  data-type="country"
                  required
                  onBlur={this.handleChange}
                  onChange={this.handleChange}
                  value={country || ""}
                  className="w-placeholder"
                >
                  {countries.map((country, i) => (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </section>
            <section className="checkbox-wrapper">
              <h1>I am a/an *</h1>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="start_up_ceo"
                    name="start_up_ceo"
                    data-type="start_up_ceo"
                    checked={start_up_ceo}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="start_up_ceo">
                    Start Up/Scale Up CEO/Founder
                  </label>
                </div>
                {start_up_ceo ? (
                  <div className="hidden-checkbox-container">
                    <div className="hidden-label">Choose Sector *</div>
                    <div>
                      <input
                        type="checkbox"
                        id="learning"
                        name="learning"
                        data-type="learning"
                        checked={selector.learning}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="learning">Learning</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="workforce_talent"
                        name="workforce_talent"
                        data-type="workforce_talent"
                        checked={selector.workforce_talent}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="workforce_talent">Workforce/talent</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="start_up_team"
                    name="start_up_team"
                    data-type="start_up_team"
                    checked={start_up_team}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="start_up_team">Start Up/Scale Up Team</label>
                </div>
                {start_up_team ? (
                  <div className="hidden-checkbox-container">
                    <div className="hidden-label">Choose Sector *</div>
                    <div>
                      <input
                        type="checkbox"
                        id="learning"
                        name="learning"
                        data-type="learning"
                        checked={selector.learning}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="learning">Learning</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="workforce_talent"
                        name="workforce_talent"
                        data-type="workforce_talent"
                        checked={selector.workforce_talent}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="workforce_talent">Workforce/talent</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="learning_innovation_leader"
                    name="learning_innovation_leader"
                    data-type="learning_innovation_leader"
                    checked={learning_innovation_leader}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="learning_innovation_leader">
                    Learning Innovation Leader
                  </label>
                </div>
                {learning_innovation_leader ? (
                  <div className="hidden-checkbox-container">
                    <div className="hidden-label">Choose Sector *</div>
                    <div>
                      <input
                        type="checkbox"
                        id="early_childhood"
                        name="early_childhood"
                        data-type="early_childhood"
                        checked={selector.early_childhood}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="early_childhood">Early Childhood</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="k12"
                        name="k12"
                        data-type="k12"
                        checked={selector.k12}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="k12">K12</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="accredited"
                        name="accredited"
                        data-type="accredited"
                        checked={selector.accredited}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="accredited">
                        Post-Secondary: Accredited
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="non_accredited"
                        name="non_accredited"
                        data-type="non_accredited"
                        checked={selector.non_accredited}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="non_accredited">
                        Post-Secondary: Non-accredited
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="pre_k_gray"
                        name="pre_k_gray"
                        data-type="pre_k_gray"
                        checked={selector.pre_k_gray}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="pre_k_gray">
                        &quot;PreK-Gray&quot; Multi Sector
                      </label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="workforce_innovation_executive"
                    name="workforce_innovation_executive"
                    data-type="workforce_innovation_executive"
                    checked={workforce_innovation_executive}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="workforce_innovation_executive">
                    Workforce Innovation Executive
                  </label>
                </div>
                {workforce_innovation_executive ? (
                  <div className="hidden-checkbox-container">
                    <div className="hidden-label">Choose Sector *</div>
                    <div>
                      <input
                        type="checkbox"
                        id="ceo"
                        name="ceo"
                        data-type="ceo"
                        checked={selector.ceo}
                        onChange={this.handleSelectorChange}
                      />

                      <label htmlFor="ceo">CEO</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="talent_people"
                        name="talent_people"
                        data-type="talent_people"
                        checked={selector.talent_people}
                        onChange={this.handleSelectorChange}
                      />

                      <label htmlFor="talent_people">Talent/People</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="l_d"
                        name="l_d"
                        data-type="l_d"
                        checked={selector.l_d}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="l_d">L & D</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="foundation_leader"
                    name="foundation_leader"
                    data-type="foundation_leader"
                    checked={foundation_leader}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="foundation_leader">
                    Foundation/Philanthropic Leader
                  </label>
                </div>
              </div>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="investor"
                    name="investor"
                    data-type="investor"
                    checked={investor}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="investor">Investor</label>
                </div>
                {investor ? (
                  <div className="hidden-checkbox-container">
                    <div className="hidden-label">Choose Sector *</div>
                    <div>
                      <input
                        type="checkbox"
                        id="venture"
                        name="venture"
                        data-type="venture"
                        checked={selector.venture}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="venture">Venture</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="growth"
                        name="growth"
                        data-type="growth"
                        checked={selector.growth}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="growth">Growth</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="private_equity"
                        name="private_equity"
                        data-type="private_equity"
                        checked={selector.private_equity}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="private_equity">Private Equity</label>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="checkbox-container">
                <div>
                  <input
                    type="checkbox"
                    id="student"
                    name="student"
                    data-type="student"
                    checked={student}
                    onChange={this.handleCheckboxChange}
                  />
                  <label htmlFor="student">Student</label>
                </div>
                {student ? (
                  <div className="hidden-checkbox-container">
                    <div className="hidden-label">Choose Sector *</div>
                    <div>
                      <input
                        type="checkbox"
                        id="graduate_student"
                        name="graduate_student"
                        data-type="graduate_student"
                        checked={selector.graduate_student}
                        onChange={this.handleSelectorChange}
                      />
                      <label htmlFor="graduate_student">Graduate Student</label>
                    </div>
                    <div>
                      <label htmlFor="other">Other: </label>
                      <input
                        type="text"
                        id="other"
                        name="other"
                        data-type="other"
                        value={selector.other}
                        onChange={this.handleOther}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
            <section className="checkbox-wrapper">
              <div className="checkbox-container checkbox-container-full-width">
                <div>
                  <input
                    type="checkbox"
                    id="service_agreement"
                    name="service_agreement"
                    data-type="service_agreement"
                    value={service_agreement}
                    required
                    onChange={this.handleSecondCheckboxChange}
                  />
                  <label htmlFor="service_agreement">
                    I agree to the{" "}
                    <LinkWrapper
                      href="https://www.freeman.com/terms-of-use"
                      external={true}
                      componentName="Terms of Service and Privacy Policy"
                    >
                      Terms of Service and Privacy Policy
                    </LinkWrapper>{" "}
                    *
                  </label>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="checkbox"
                    id="your_event_updates"
                    name="your_event_updates"
                    data-type="your_event_updates"
                    value={your_event_updates}
                    onChange={this.handleSecondCheckboxChange}
                  />
                  <label htmlFor="your_event_updates">
                    I would like to receive updates through email from this
                    event.
                  </label>
                </div>
              </div>
            </section>
            <OEPAnalytics
              componentType="Button"
              page="Register"
              url="Sign up"
              componentName="Sign up"
            >
              <button
                type="submit"
                className="details-button details-button-active details-button-header"
              >
                Sign up
              </button>
            </OEPAnalytics>
            <p className="bottom-text">* Required</p>
          </form>
        )}
        {formResponse && formResponse === "sent" && (
          <div className="error-message-container">
            <h1 className="error-message error-message-title">
              Thank you for registering!
            </h1>
            <h1 className="error-message">
              You will receive your password prior to the start of the Summit.
            </h1>
          </div>
        )}
        {formResponse && formResponse === "not sent" && (
          <div className="error-message-container">
            <h1 className="error-message">
              Something went wrong, please try again later.
            </h1>
          </div>
        )}
      </div>
    );
  }
}
