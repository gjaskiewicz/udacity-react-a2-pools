import { render, screen } from '@testing-library/react';
import LeaderboardEntry from "./LeaderboardEntry";

describe("LeaderboardEntry", () => {
    const user = {
        name: "Ye Zhetai",
        avatarUrl: "http://fake.url.net/picture.png"
    };

    it("matches snapshot", () => {
        const component = render(<LeaderboardEntry user={user} />);
        expect(component).toMatchSnapshot();
    });
});