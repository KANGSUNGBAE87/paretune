import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

async function answerQuestions(count: number) {
  for (let index = 0; index < count; index += 1) {
    await userEvent.click(screen.getByRole("radio", { name: "그렇다" }));
    await userEvent.click(screen.getByRole("button", { name: index === count - 1 ? /답변 봉인하기|다음/ : "다음" }));
  }
}

async function openResultScreen() {
  await userEvent.click(screen.getByRole("button", { name: "커플 성향지도 시작하기" }));
  await userEvent.click(screen.getByRole("checkbox", { name: "안내를 확인했어요" }));
  await userEvent.click(screen.getByRole("button", { name: "다음" }));
  await userEvent.click(screen.getByRole("button", { name: "첫 번째 테스트 시작" }));
  await answerQuestions(25);
  await userEvent.click(screen.getByRole("button", { name: "상대에게 폰 넘기기" }));
  await userEvent.click(screen.getByRole("button", { name: "내 테스트 시작하기" }));
  await answerQuestions(25);
  await userEvent.click(screen.getByRole("button", { name: "우리 결과 열기" }));
}

describe("App flow", () => {
  it("requires safety confirmation before setup", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "커플 성향지도 시작하기" }));
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
    await userEvent.click(screen.getByRole("checkbox", { name: "안내를 확인했어요" }));
    expect(screen.getByRole("button", { name: "다음" })).toBeEnabled();
  });

  it("seals participantA before participantB and waits at ready-to-reveal before showing results", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "커플 성향지도 시작하기" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "안내를 확인했어요" }));
    await userEvent.click(screen.getByRole("button", { name: "다음" }));
    await userEvent.clear(screen.getByLabelText("첫 번째 사람 닉네임"));
    await userEvent.type(screen.getByLabelText("첫 번째 사람 닉네임"), "지민");
    await userEvent.clear(screen.getByLabelText("두 번째 사람 닉네임"));
    await userEvent.type(screen.getByLabelText("두 번째 사람 닉네임"), "민수");
    await userEvent.click(screen.getByRole("button", { name: "첫 번째 테스트 시작" }));

    await answerQuestions(25);
    expect(screen.getByText("답변이 봉인되었어요")).toBeInTheDocument();
    expect(screen.queryByText("우리의 커플 성향지도")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "상대에게 폰 넘기기" }));
    expect(screen.getByText("이제 민수님 차례예요")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "내 테스트 시작하기" }));
    await answerQuestions(25);
    expect(screen.getByText("두 사람의 응답이 모두 모였어요")).toBeInTheDocument();
    expect(screen.queryByText("우리의 커플 성향지도")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "우리 결과 열기" }));
    expect(screen.getByText("우리의 커플 성향지도")).toBeInTheDocument();
    expect(screen.getByText("문항별 답변과 민감한 세부 내용은 포함되지 않아요.")).toBeInTheDocument();
  });

  it("offers a non-destructive home action on the result screen", async () => {
    render(<App />);

    await openResultScreen();

    await userEvent.click(screen.getByRole("button", { name: "처음으로 돌아가기" }));

    expect(screen.getByRole("button", { name: "커플 성향지도 시작하기" })).toBeInTheDocument();
  });

  it("saves only the safe report payload without raw answers", async () => {
    window.localStorage.clear();
    render(<App />);

    await openResultScreen();
    await userEvent.click(screen.getByRole("button", { name: "결과 저장하기" }));

    const saved = window.localStorage.getItem("couple-tendency:last-result");
    expect(saved).toContain("report");
    expect(saved).not.toContain("answers");
    expect(saved).not.toContain("responses");
    expect(saved).not.toContain("questionId");
  });
});
