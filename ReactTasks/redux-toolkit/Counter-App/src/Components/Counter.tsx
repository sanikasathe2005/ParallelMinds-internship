
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../Redux/counterSlice";

function Counter()
{
  const count = useSelector(
        (state: { counter: { count: number } }) => state.counter.count
    );
    
    //gives the function to send actions to Redux.
    const dispatch=useDispatch();

    function handleIncrement()
    {
        dispatch(increment());
    }

    function handleDecrement()
    {
        dispatch(decrement());
    }

    function handleReset()
    {
        dispatch(reset());
    }

    let status="";
    if(count>0)
    {
        status="Positive"
    }
    else if(count<0)
    {
        status="Negative";
    }
    else{
        status="zero";
    }
       return (
        <div className="container">
            <h1>Counter App</h1>

            <h2>{count}</h2>

            <button className="button" onClick={handleIncrement}>
                Increment
            </button>

            <button
                className="button"
                onClick={handleDecrement}
                disabled={count === 0}
            >
                Decrement
            </button>

            <button className="button" onClick={handleReset}>
                Reset
            </button>

            <p>{status}</p>
        </div>
    );
}

export default Counter;