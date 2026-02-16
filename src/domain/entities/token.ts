class Token {
  constructor(
    public readonly token: string,
    public readonly expiresTTL: number,
  ) {}
}

export default Token;
