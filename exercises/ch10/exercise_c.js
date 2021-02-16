// For this exercise, we consider the following helpers:
//
//   const localStorage = {
//     player1: { id:1, name: 'Albert' },
//     player2: { id:2, name: 'Theresa' },
//   };
//
//   // getFromCache :: String -> IO User
//   const getFromCache = x => new IO(() => localStorage[x]);
//
//   // game :: User -> User -> String
//   const game = curry((p1, p2) => `${p1.name} vs ${p2.name}`);
//
// Write an IO that gets both player1 and player2 from the cache and starts the game.

// solution 1
// startGame :: IO String
// const startGame = new IO(game)
// 	.ap(getFromCache('player1'))
// 	.ap(getFromCache('player2'));

// solution 2
// startGame :: IO String
const startGame = liftA2(game, getFromCache('player1'), getFromCache('player2'))

console.log('startGame', startGame.unsafePerformIO())
