import AttendeeProfileDetails from "../Profile/AttendeeProfileDetails";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
jest.mock(
  "../Profile/AttendeeProfileDetails.js",
  () => "AttendeeProfileDetails"
);

describe("AttendeeProfileDetails", () => {
  let wrapper;
  const mockStore = createStore((state) => state, {
    global: {
      profileConfigurations: {
        settings: {
          profilePhotoUpload: {
            hide: false,
          },
          disableNetworking: {
            hide: false,
          },
        },
        attributes: [
          {
            pageSearch: false,
            hide: false,
            label: "Interests",
            attr: "Interests",
            checkboxFilter: true,
            checkboxSchema: [
              "Engineering",
              "Music",
              "Technology",
              "Sales",
              "Audio",
              "Coffee",
              "Cars",
              "Sports",
              "Stuff",
              "MoreThan25CharactersInThisOptionForTruncating",
            ],
          },
        ],
        company: {
          website: {
            readOnly: true,
            hide: true,
          },
          occupation: {
            readOnly: true,
            hide: true,
          },
          jobTitle: {
            readOnly: true,
            hide: true,
          },
          companyName: {
            readOnly: true,
            hide: true,
          },
        },
        location: {
          postalCodePlusFour: {
            readOnly: true,
            hide: true,
          },
          country: {
            readOnly: true,
            hide: true,
          },
          state: {
            readOnly: true,
            hide: true,
          },
          region: {
            readOnly: true,
            hide: true,
          },
          city: {
            readOnly: true,
            hide: true,
          },
          postalCode: {
            readOnly: true,
            hide: true,
          },
        },
        basic: {
          firstName: {
            readOnly: true,
            hide: true,
          },
          lastName: {
            readOnly: true,
            hide: true,
          },
          emailAddress: {
            hide: true,
          },
          prefix: {
            readOnly: true,
            hide: true,
          },
          language: {
            readOnly: true,
            hide: true,
          },
          preferredName: {
            readOnly: true,
            hide: true,
          },
          suffix: {
            readOnly: true,
            hide: true,
          },
        },
        social: {
          snapchat: {
            readOnly: true,
            hide: true,
          },
          twitter: {
            readOnly: true,
            hide: true,
          },
          instagram: {
            readOnly: true,
            hide: true,
          },
          linkedin: {
            readOnly: true,
            hide: true,
          },
          facebook: {
            readOnly: true,
            hide: true,
          },
        },
      },
    },
  });

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={mockStore}>
        <AttendeeProfileDetails />
      </Provider>
    );
  });

  it("renders successfully", () => {
    expect(wrapper.find(AttendeeProfileDetails).length).toEqual(1);
    const props = {
      attendeeProfile: mockStore.global,
      profileConfigurations: mockStore.global,
    };
    const component = shallow(<AttendeeProfileDetails {...props} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
