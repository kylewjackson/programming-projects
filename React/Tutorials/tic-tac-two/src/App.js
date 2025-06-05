import { useState } from "react";

function Square({ value, winningSquare, onSquareClick }) {
	return (
		<button className={winningSquare ? 'square winner' : 'square'} onClick={onSquareClick}>
			{value}
		</button>
	);
}

function Board({ xIsNext, squares, onPlay, winner, winningLine, isDraw }) {
	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		onPlay(nextSquares);
	}

	let status;
	if (winner) {
		status = winner + " Wins! :)";
	} else if (isDraw) {
		status = "Oh no! It's a Draw :(";
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<>
			<div className="status">{status}</div>
			{Array(3)
				.fill(null)
				.map((_, row) => {
					return (
						<div className="board-row" key={row}>
							{Array(3)
								.fill(null)
								.map((_, cell) => {
									const i = row * 3 + cell;
									return (
										<Square
											key={i}
											value={squares[i]}
											onSquareClick={() => handleClick(i)}
											winningSquare={winningLine?.includes(i)}
										/>
									);
								})}
						</div>
					);
				})}
		</>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];
	const [ascendingOrder, setAscendingOrder] = useState(true);
	const result = calculateWinner(currentSquares);
	const winner = result?.winner;
	const winningLine = result?.line;
	const isDraw = currentMove === 9 && !winner;

	function handlePlay(nextSquares) {
		const nextHistory = [
			...history.slice(0, currentMove + 1),
			nextSquares,
		];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	function handleAscendingOrder() {
		setAscendingOrder(!ascendingOrder);
	}

	const moves = history.map((_squares, move) => {
		let description;
		if (move > 0) {
			description = "Go to move #" + move;
		} else {
			description = "Go to game start";
		}

		let content;
		if (move === currentMove) {
			if (winner) {
				content = (
					<span>
						{winner} Won at Move {move}
					</span>
				);
			} else if (isDraw) {
				content = <span>It's a draw!</span>;
			} else {
				content = <span>You are at move {move + 1}</span>;
			}
		} else {
			content = (
				<button onClick={() => jumpTo(move)}>{description}</button>
			);
		}

		return <li key={move}>{content}</li>;
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
					winner={winner}
					winningLine={winningLine}
					isDraw={isDraw}
				/>
			</div>
			<div className="game-info">
				<ol>{ascendingOrder ? moves : [...moves].reverse()}</ol>
				<button onClick={handleAscendingOrder}>
					{ascendingOrder
						? "Sort By Descending"
						: "Sort By Ascending"}
				</button>
			</div>
		</div>
	);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return { winner: squares[a], line: [a, b, c] };
		}
	}
	return null;
}
