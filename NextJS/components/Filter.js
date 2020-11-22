import { ChevronDown, ArrowUp, ArrowDown} from 'react-bootstrap-icons';

function Filter() {
    return(
        <nav>
            <ul class="menu list pa3 gray sans-serif f6 fw5 tracked">
                <li class="dib ma2 bg-animate hover-bg-light-blue hide-child relative-m relative-l w-100 w-auto-ns">
                    <a href="#" class="dib nav tc no-underline pa2 ph4 bg-moon-gray white w-100">Filter1
                    <ChevronDown size='8'/>
                    </a>
                        <ul class="menu list bg-light-blue mt1 pa1 f6 child child-vs o-100-vs absolute-m absolute-l top-100-m w-100 br2 shadow-4">
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Category1
                                </a>
                            </li>
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Category2
                                </a>
                            </li>
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Category3
                                </a>
                            </li>
                        </ul>
                </li>
                <li class="dib ma2 bg-animate hover-bg-light-blue hide-child relative-m relative-l w-100 w-auto-ns">
                    <a href="#" class="dib nav tc no-underline pa2 ph4 bg-moon-gray white w-100">Filter2
                    <ChevronDown size='8'/>
                    </a>
                        <ul class="menu list bg-light-blue mt1 pa1 f6 child child-vs o-100-vs absolute-m absolute-l top-100-m w-100 br2 shadow-4">
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Category1
                                </a>
                            </li>
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Category2
                                </a>
                            </li>
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Category3
                                </a>
                            </li>
                        </ul>
                </li>
                <li class="dib ma2 bg-animate hover-bg-light-blue hide-child relative-m relative-l w-100 w-auto-ns">
                    <a href="#" class="dib nav tc no-underline pa2 ph4 bg-moon-gray white w-100">Sort By
                    <ChevronDown size='8'/>
                    </a>
                        <ul class="menu list bg-light-blue mt1 pa1 f6 child child-vs o-100-vs absolute-m absolute-l top-100-m w-100 br2 shadow-4">
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Order1
                                </a>
                            </li>
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Order2
                                </a>
                            </li>
                            <li class="ma1 pa1 ph3 bg-light-blue bg-animate hover-bg-white">
                                <a href="#">
                                    Order3
                                </a>
                            </li>
                        </ul>
                </li>
                <a href="#"><ArrowUp size='16'/></a>
                <a href="#"><ArrowDown size='16'/></a>
            </ul>
        </nav>
    );
}

export default Filter;